import { getRepository } from 'typeorm';

import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const checkCategoryExist = await categoryRepository.findOne({
      where: { title: title },
    });

   if (checkCategoryExist) {
      return checkCategoryExist;
    }

    const category = categoryRepository.create({
      title
    })

    await categoryRepository.save(category);

    return category;
  }

} export default CreateCategoryService;
