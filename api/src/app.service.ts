import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  private readonly logger = new Logger(AppService.name);

  async register(dto: RegisterDto) {
    this.logger.log('register service triggered. username: ' + dto.username);
    const { username, displayName, password } = dto;
    const isExistUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (isExistUser) {
      this.logger.log(
        'bad request for ' + dto.username + '. username already exist',
      );
      throw new BadRequestException('username already exist');
    }

    const hashedPassword = await this.hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        username,
        displayName,
        password: hashedPassword,
      },
    });
    const token = await this.signToken({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    });
    this.logger.log('user registered successfully. token: ' + token);
    return { message: true, token };
  }

  async login(dto: LoginDto) {
    this.logger.log('login service triggered. username: ' + dto.username);
    const { username, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      this.logger.log(
        'bad request exception. username: ' +
          dto.username +
          '. username cannot find',
      );

      throw new BadRequestException('username cannot find');
    }

    const isMatch = await this.comparePassword({
      password,
      hash: foundUser.password,
    });

    if (!isMatch) throw new BadRequestException('wrong credentials');

    const token = await this.signToken({
      id: foundUser.id,
      username: foundUser.username,
      displayName: foundUser.displayName,
    });
    this.logger.log(
      'login user successfully. username: ' +
        dto.username +
        '. token: ' +
        token,
    );

    return { message: true, token };
  }

  async hashPassword(password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  }

  async comparePassword(args: { password: string; hash: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { id; username; displayName }) {
    const payload = args;
    return this.jwt.sign(payload, { secret: 'JWT_SECRET' });
  }

  async validateUser(payload: any) {
    const user = {
      id: payload.id,
      username: payload.username,
      displayName: payload.displayName,
    };
    return user;
  }
}
