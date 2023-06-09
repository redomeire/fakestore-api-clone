import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // require user authentication

  @Get()
  getAllProducts(
    @Query('limit') limit?: number,
    @Query('sort') sort?: 'ASC' | 'DESC',
  ): Promise<Product[]> {
    return this.productService.getAllProducts(limit, sort);
  }

  @Get(':id')
  getProductById(@Param('id') id: number): Promise<Product> {
    return this.productService.getOneProduct(id);
  }

  @Post()
  createNewProduct(@Body() product: Product): Promise<Product> {
    return this.productService.insertProduct(product);
  }

  @Put(':id')
  async updateProduct(
    @Body() product: Product,
    @Param('id', ParseIntPipe) id: number,
  ) {
    await this.productService.updateProduct(product, id);
  }

  @Delete(':id')
  deleteProduct(@Param() id: number) {
    return this.productService.deleteProduct(id);
  }
}
