import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private users = []; // Array temporal

  async createUser(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      userId: Date.now().toString(),
      username,
      password: hashedPassword,
    };
    this.users.push(user);
    return user;
  }

  async findOne(username: string) {
    return this.users.find(user => user.username === username);
  }
}
