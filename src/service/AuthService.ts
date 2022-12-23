import * as bcrypt from 'bcrypt';
import Prisma from '../config/prisma.config';
import IAuthService from './IAuthService';
import CreateUser from '../type/CreateUser';

class LolService implements IAuthService {
  private prisma: Prisma;

  constructor() {
    this.prisma = Prisma.Instance;
  }

  async postRegisterUser(user: CreateUser) {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);
  
    await this.prisma.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password,
      },
    });
  }
}

export default LolService;
