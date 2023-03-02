import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseLogger } from './database.logger';
import { BooksService } from './books/books.service';
import { hashPassword, comparePassword } from './common/utils';
@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private readonly logger: DatabaseLogger,
    private bookService: BooksService,
  ) {}

  async register(dto: RegisterDto) {
    const { username, displayName, password } = dto;
    const isExistUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (isExistUser) {
      this.logger.log({
        userId: null,
        tableName: 'user',
        data: JSON.stringify({
          message: 'username already exist',
          dto: dto,
        }),
        action: 'SELECT',
      });
      throw new BadRequestException('username already exist');
    }

    const hashedPassword = await hashPassword(password);
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
    this.logger.log({
      userId: user.id,
      tableName: 'user',
      data: JSON.stringify({
        message: 'user create successfull',
        user,
      }),
      action: 'INSERT',
    });
    return {
      message: true,
      token,
      username: user.username,
      displayName: user.displayName,
    };
  }

  async login(dto: LoginDto) {
    this.logger.log({
      userId: null,
      tableName: 'user',
      data: JSON.stringify({
        message: 'AppService.login triggered',
        dto: dto,
      }),
      action: 'INSERT',
    });
    const { username, password } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (!foundUser) {
      this.logger.log({
        userId: null,
        tableName: 'user',
        data: JSON.stringify({
          message: 'username cannot find',
          dto: dto,
        }),
        action: 'SELECT',
      });
      throw new BadRequestException('username cannot find');
    }

    const isMatch = await comparePassword({
      password,
      hash: foundUser.password,
    });

    if (!isMatch) throw new BadRequestException('wrong credentials');

    const token = await this.signToken({
      id: foundUser.id,
      username: foundUser.username,
      displayName: foundUser.displayName,
    });
    this.logger.log({
      userId: foundUser.id,
      tableName: 'user',
      data: JSON.stringify({
        message: 'user login successfully',
        dto: dto,
      }),
      action: 'SELECT',
    });

    return {
      message: true,
      token,
      username: foundUser.username,
      displayName: foundUser.displayName,
    };
  }
  async signToken(args: { id; username; displayName }) {
    const payload = args;
    return this.jwt.sign(payload, { secret: 'JWT_SECRET' });
  }
  // I don't fully understand the documentation. This may be unnecessary.
  // If necessary, remove the comment line.

  /* @Cron(CronExpression.EVERY_MINUTE)
  updatePrices() {
    this.bookService.updatePrices();
  } */
}
