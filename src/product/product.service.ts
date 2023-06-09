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

  getAllProducts(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  getOneProduct(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  insertProduct(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }

  async updateProduct(product: Product, id: number): Promise<Product> {
    let foundProduct = await this.productsRepository.findOneBy({
      id,
    });

    if (!product) throw new NotFoundException('Product not found');

    foundProduct = { ...product };
    return await this.productsRepository.save(foundProduct);
  }

  async deleteProduct(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException('Product not found');
  }
}
