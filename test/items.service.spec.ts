import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../src/items/item.entity';
import { ItemsService } from '../src/items/items.service';

const mockRepo = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
});

describe('ItemsService', () => {
  let service: ItemsService;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useFactory: mockRepo,
        },
      ],
    }).compile();

    service = moduleRef.get(ItemsService);
    repo = moduleRef.get(getRepositoryToken(Item));
  });

  it('creates an item', async () => {
    const owner = { id: 'user-1' } as any;
    const dto = { name: 'Test Item', description: 'desc' };
    const created = { ...dto, owner };
    const saved = { id: '1', ...created };

    repo.create.mockReturnValue(created);
    repo.save.mockResolvedValue(saved);

    const result = await service.create(dto as any, owner);

    expect(repo.create).toHaveBeenCalledWith({ ...dto, owner });
    expect(repo.save).toHaveBeenCalledWith(created);
    expect(result).toEqual(saved);
  });
});
