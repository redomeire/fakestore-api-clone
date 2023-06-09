import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  getAllProducts(limit?: number, sort?: 'ASC' | 'DESC'): Promise<Product[]> {
    if (limit !== null || sort != null) {
      const products = this.productsRepository.find({
        take: limit,
        order: { name: sort },
      });

      return products;
    }
    return this.productsRepository.find();
  }

  getOneProduct(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  insertProduct(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  updateProduct(product: Product, id: number) {
    console.log(product, id);

    return this.productsRepository.update({ id }, { ...product });
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('Product not found');
  }
}
