import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user)
      throw new NotFoundException({
        status: 'fail',
        message: 'user not found',
      });

    const match = await compare(pass, user.password);

    if (!match)
      throw new BadRequestException({
        status: 'fail',
        message: 'wrong username or password',
      });

    const payload = { sub: user.id, username: user.username };

    return {
      status: 'success',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: User) {
    const foundUser = await this.usersService.findOne(user.username);

    if (foundUser !== null)
      throw new BadRequestException({
        status: 'fail',
        message: 'user has been created before',
      });

    const salt = await genSalt();
    const hashPassword = await hash(user.password, salt);
    user.password = hashPassword;
    const newUser = await this.usersService.create(user);

    return newUser;
  }
  async validate(token: string): Promise<User> {
    const payload = this.jwtService.verify(token);
    return this.usersService.findOne(payload.username);
  }
}
