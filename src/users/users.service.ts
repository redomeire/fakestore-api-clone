import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ username });
  }
  async create(user: User): Promise<any> {
    const savedUser = await this.usersRepository.save(user);

    const profile = await this.profileService.create('', '', '', user);

    return {
      status: 'success',
      message: 'success register',
      user: savedUser,
      profile,
    };
  }
}
