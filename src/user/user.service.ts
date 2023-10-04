import * as bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(createUserDto);

      newUser.password = await this.hashPassword(createUserDto.password);

      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  private async hashPassword(password: string): Promise<string> {
    try {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
    } catch (error) {
      throw new Error('Failed to hash the password');
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (error) {
      throw new Error('Failed to fetch all users');
    }
  }

  async findOne(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new Error('Failed to find the user by email');
    }
  }

  async findById(id: number): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error('Failed to find the user by ID');
    }
  }
}
