import { MongoRepository } from 'typeorm';
import { Product } from '../../src/products/entities/product.entity';
import { ProductsService } from '../../src/products/products.service';
import { CreateProductDto } from '../../src/products/dto/create-product.dto';
import { UpdateProductDto } from '../../src/products/dto/update-product.dto';

describe('ProductsService', () => {
  let productRepository: MongoRepository<Product>;
  let productService: ProductsService;

  beforeAll(() => {
    // @ts-ignore
    productRepository = new MongoRepository<Product>();
    productService = new ProductsService(productRepository);
  });

  describe('create', () => {
    it('should call Product repository save method', async () => {
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

      const saveSpy = jest
        .spyOn(productRepository, 'save')
        .mockResolvedValueOnce(product);

      const result = await productService.create(createProductDto);

      expect(saveSpy).toHaveBeenCalledWith(createProductDto);
      expect(result).toEqual(product);
    });
  });

  describe('findAll', () => {
    it('should call Product repository find method', async () => {
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

      const findSpy = jest
        .spyOn(productRepository, 'find')
        .mockResolvedValueOnce(products);

      const result = await productService.findAll();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(products);
    });
  });

  describe('findOne', () => {
    it('should call Product repository findOneBy method', async () => {
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

      const findOneBySpy = jest
        .spyOn(productRepository, 'findOneBy')
        .mockResolvedValueOnce(product);

      const result = await productService.findOne(id);

      expect(findOneBySpy).toHaveBeenCalledWith({ _id: id });
      expect(result).toBe(product);
    });
  });

  describe('update', () => {
    it('should call Product repository update method', async () => {
      const id = '64342e031a1b721892473843';
      const updateProductDto: UpdateProductDto = {
        name: 'name',
        description: 'description',
        quantity: 1,
        price: 1000,
      };
      const updateSpy = jest
        .spyOn(productRepository, 'update')
        .mockResolvedValueOnce({ raw: '', affected: 1, generatedMaps: [] });

      await productService.update(id, updateProductDto);

      expect(updateSpy).toHaveBeenCalledWith(id, updateProductDto);
    });
  });

  describe('remove', () => {
    it('should call Product repository delete method', async () => {
      const id = '64342e031a1b721892473843';

      const deleteSpy = jest
        .spyOn(productRepository, 'delete')
        .mockResolvedValueOnce({ raw: '', affected: 1 });

      const result = await productService.remove(id);

      expect(deleteSpy).toHaveBeenCalledWith(id);
      expect(result).toEqual({ raw: '', affected: 1 });
    });
  });
});
