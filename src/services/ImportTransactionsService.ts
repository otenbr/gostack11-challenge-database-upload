import path from 'path';
import fs from 'fs';
import csvParse from 'csv-parse/lib/sync';

import { getCustomRepository, getRepository } from 'typeorm';

import Category from '../models/Category';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface ImportTransactionsServiceRequest {
  filename: string;
}

interface CsvItem {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class ImportTransactionsService {
  async execute({
    filename,
  }: ImportTransactionsServiceRequest): Promise<Transaction[]> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const filenamePath = path.join(uploadConfig.dest, filename);

    if (!(await fs.promises.stat(filenamePath))) {
      throw new AppError('File not found.');
    }

    const fileContent = await fs.promises.readFile(filenamePath, {
      encoding: 'utf8',
    });

    const csvItems: CsvItem[] = csvParse(fileContent, {
      trim: true,
      skip_empty_lines: true,
      columns: true,
    });

    const promiseTransactions = csvItems.map(async c => {
      const findCategory = await categoryRepository.findOne({
        title: c.category,
      });

      let newCategory = {} as Category;
      if (!findCategory) {
        newCategory = categoryRepository.create({ title: c.category });
        await categoryRepository.save(newCategory);
      }

      const transaction = transactionsRepository.create({
        title: c.title,
        type: c.type,
        value: c.value,
        category_id: findCategory ? findCategory.id : newCategory.id,
      });

      return transaction;
    });

    const transactions = await Promise.all(promiseTransactions).then(
      data => data,
    );

    await transactionsRepository.save(transactions);

    return transactions;
  }
}

export default ImportTransactionsService;
