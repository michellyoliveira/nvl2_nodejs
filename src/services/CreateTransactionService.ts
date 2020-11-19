import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';

import TransactionRepository from '../repositories/TransactionsRepository';

import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {

    const transactionsRepository = getCustomRepository(TransactionRepository);

    if(!['income', 'outcome'].includes(type)) {
      throw new AppError('Transaction type is invalid.');
    }

    const balanceResult = transactionsRepository.getBalance();

    const total = (await balanceResult).total;

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enought balance');
    }

    const createCategoryService = new CreateCategoryService();
    const categoryCreated = await createCategoryService.execute(category);

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryCreated
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
