import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('signed-token'),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = moduleRef.get(AuthService);
  });

  it('logs in a user and returns a token', async () => {
    (usersService.findByEmail as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'test@test.com',
      password: 'hashed',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const validated = await service.validateUser('test@test.com', 'password');
    const res = await service.login(validated);

    expect(res).toEqual({ access_token: 'signed-token' });
  });
});
