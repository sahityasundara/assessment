import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  create(dto: CreateItemDto, owner: any) {
    const item = this.repo.create({ ...dto, owner });
    return this.repo.save(item);
  }

  findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async update(id: string, dto: UpdateItemDto, user: any) {
    const item = await this.findOne(id);
    if (item.owner.id !== user.id) {
      throw new ForbiddenException('You do not own this item');
    }
    Object.assign(item, dto);
    return this.repo.save(item);
  }

  async remove(id: string, user: any) {
    const item = await this.findOne(id);
    if (item.owner.id !== user.id) {
      throw new ForbiddenException('You do not own this item');
    }
    await this.repo.remove(item);
    return { deleted: true };
  }
}
