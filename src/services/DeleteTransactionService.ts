import { getCustomRepository } from 'typeorm';

import TransactionsRepository from '../repositories/TransactionsRepository';

import AppError from '../errors/AppError';

interface DeleteTransactionServiceRequest {
  id: string;
}

interface DeleteTransactionServiceResponse {
  success: boolean;
}
class DeleteTransactionService {
  public async execute({
    id,
  }: DeleteTransactionServiceRequest): Promise<
    DeleteTransactionServiceResponse
  > {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) throw new AppError('Tansaction not found.');

    await transactionsRepository.remove(transaction);

    return { success: true };
  }
}

export default DeleteTransactionService;
