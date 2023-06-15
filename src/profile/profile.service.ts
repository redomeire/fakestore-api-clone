import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  async create(
    address: string,
    bio: string,
    phone_number: string,
    user?: User,
  ): Promise<any> {
    const newProfile = await this.profileRepository.save({
      address,
      bio,
      phone_number,
      user,
    });
    return {
      status: 'success',
      profile: newProfile,
    };
  }

  async getProfile(token: string): Promise<any> {
    const payload = await this.jwtService.verify(token);

    const profile = await this.profileRepository.findOneBy({
      userId: payload.sub,
    });

    return {
      status: 'success',
      profile: profile,
      message: 'success getting profile',
    };
  }
}
