import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [ProfileModule, TypeOrmModule.forFeature([User, Profile])],
  providers: [UserService, ProfileService],
  exports: [UserService],
})
export class UsersModule {}
