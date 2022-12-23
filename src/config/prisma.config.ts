import { PrismaClient } from '@prisma/client';

class Prisma {
  private static instance: Prisma;

  public prisma: PrismaClient;

  private constructor() {
    this.prisma = new PrismaClient();
    Prisma.instance = this;
  }

  public static get Instance() {
    return Prisma.instance || new Prisma();
  }

  static initInstance() {
    if (Prisma.instance) throw Error('Instance was already initialized');
    return new Prisma();
  }
}

export default Prisma;
