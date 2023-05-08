import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: MongoRepository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: ObjectID) {
    return this.productRepository.findOneBy({ _id: id });
  }

  async update(id: ObjectID, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
  }

  remove(id: ObjectID) {
    return this.productRepository.delete(id);
  }
}
