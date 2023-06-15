import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { Public } from 'src/auth/metadata/auth.metadata';

@Public()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
