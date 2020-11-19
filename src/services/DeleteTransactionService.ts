import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getCustomRepository(TransactionRepository);

    const checkTransactionExist = await transactionsRepository.findOne(id);

    if (!checkTransactionExist) {
     throw new AppError('The transaction does not exist');
    }

    await  transactionsRepository.remove(checkTransactionExist);

    return ;
  }
}

export default DeleteTransactionService;
