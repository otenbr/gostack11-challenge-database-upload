import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const balance = transactions.reduce(
      (accumulator, item) => {
        const value = Number(item.value);

        switch (item.type) {
          case 'income':
            accumulator.income += value;
            accumulator.total += value;
            break;
          case 'outcome':
            accumulator.outcome += value;
            accumulator.total -= value;
            break;
          default:
        }

        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 },
    );

    return balance;
  }
}

export default TransactionsRepository;
