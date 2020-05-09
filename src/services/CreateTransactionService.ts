import { getCustomRepository, getRepository } from 'typeorm';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface CreateTransactionServiceRequest {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: CreateTransactionServiceRequest): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const balance = await transactionRepository.getBalance();

    if (type === 'outcome' && value > balance.total)
      throw new AppError(
        'Total Balance is not enough to execute the operation.',
      );

    const categoryRepository = getRepository(Category);

    const findCategory = await categoryRepository.findOne({ title: category });

    let newCategory = {} as Category;
    if (!findCategory) {
      newCategory = categoryRepository.create({ title: category });
      await categoryRepository.save(newCategory);
    }

    const transaction = transactionRepository.create({
      title,
      type,
      value,
      category_id: findCategory ? findCategory.id : newCategory.id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
