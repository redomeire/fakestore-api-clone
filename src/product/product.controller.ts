import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // require user authentication

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getOneProduct(id);
  }

  @Post()
  createNewProduct(@Body() product: Product): Promise<Product> {
    return this.productService.insertProduct(product);
  }

  @Put()
  updateProduct(@Body() product: Product, @Param() id: number) {
    return this.productService.updateProduct(product, id);
  }

  @Delete()
  deleteProduct(@Param() id: number) {
    return this.productService.deleteProduct(id);
  }
}
