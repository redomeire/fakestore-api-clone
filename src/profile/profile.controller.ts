import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Get()
  getProfile(@Request() req) {
    const token = req.headers.authorization.replace('Bearer ', '');
    return this.profileService.getProfile(token);
  }
}
