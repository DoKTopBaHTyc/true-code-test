import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  create(data: Partial<Product>) {
    const p = this.repo.create(data);
    return this.repo.save(p);
  }

  async findOne(id: string) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  async update(id: string, data: Partial<Product>) {
    await this.repo.update({ id }, data as any);
    return this.findOne(id);
  }

  async remove(id: string) {
    const p = await this.findOne(id);
    await this.repo.delete({ id });
    return p;
  }

  async findAll(query: any) {
    const qb = this.repo.createQueryBuilder('p');

    if (query.q) qb.andWhere('(p.title ILIKE :q OR p.description ILIKE :q)', { q: `%${query.q}%` });
    if (query.minPrice) qb.andWhere('p.price >= :min', { min: query.minPrice });
    if (query.maxPrice) qb.andWhere('p.price <= :max', { max: query.maxPrice });

    const allowedSort = ['title', 'price', 'sku', 'discountedPrice'];
    const sortField = allowedSort.includes(query.sortBy) ? query.sortBy : 'title';
    const sortOrder = (query.order || 'asc').toUpperCase();
    qb.orderBy(`p.${sortField}`, sortOrder as 'ASC' | 'DESC');

    const page = parseInt(query.page || '1', 10);
    const limit = Math.min(parseInt(query.limit || '10', 10), 100);
    qb.skip((page - 1) * limit).take(limit);

    const [items, total] = await qb.getManyAndCount();
    return { items, total, page, limit };
  }
}
