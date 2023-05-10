import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../../src/products/entities/product.entity';
import { ProductsController } from '../../src/products/products.controller';
import { ProductsService } from '../../src/products/products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            save: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService);
    productsController = moduleRef.get<ProductsController>(ProductsController);
  });

  describe('create', () => {
    it('should call productsService create method', async () => {
      const createProductDto: CreateProductDto = {
        name: 'name',
        description: 'description',
        quantity: 1,
        price: 1000,
      };

      const product = {
        ...createProductDto,
        id: '64342e031a1b721892473843',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createSpy = jest
        .spyOn(productsService, 'create')
        .mockResolvedValueOnce(product);

      const result = await productsController.create(createProductDto);

      expect(createSpy).toHaveBeenCalledWith(createProductDto);
      expect(result).toBe(product);
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [
        {
          id: '64342e031a1b721892473843',
          name: 'name',
          description: 'description',
          quantity: 1,
          price: 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      jest.spyOn(productsService, 'findAll').mockResolvedValueOnce(products);

      const result = await productsController.findAll();

      expect(result).toBe(products);
    });
  });

  describe('findOne', () => {
    it('should return an product', async () => {
      const id = '64342e031a1b721892473843';
      const product = {
        id,
        name: 'name',
        description: 'description',
        quantity: 1,
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const findOneSpy = jest
        .spyOn(productsService, 'findOne')
        .mockResolvedValueOnce(product);

      const result = await productsController.findOne(id);

      expect(findOneSpy).toHaveBeenCalledWith(id);
      expect(result).toBe(product);
    });
  });

  describe('update', () => {
    it('should call productsService update method', async () => {
      const id = '64342e031a1b721892473843';
      const updateProductDto: UpdateProductDto = {
        name: 'name',
        description: 'description',
        quantity: 1,
        price: 1000,
      };
      const updateSpy = jest
        .spyOn(productsService, 'update')
        .mockResolvedValueOnce();

      await productsController.update(id, updateProductDto);

      expect(updateSpy).toHaveBeenCalledWith(id, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should call productsService remove method', async () => {
      const id = '64342e031a1b721892473843';

      const removeSpy = jest
        .spyOn(productsService, 'remove')
        .mockResolvedValueOnce({ raw: '', affected: 1 });

      const result = await productsController.remove(id);

      expect(removeSpy).toHaveBeenCalledWith(id);
      expect(result).toEqual({ raw: '', affected: 1 });
    });
  });
});
