import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from './schemas/super-admin.schema';
import { Model } from 'mongoose';
import { CreateSuperAdminDto } from './dtos/super-admin.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class SuperAdminService {
  constructor(
    @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdmin>,
  ) {}

  async getAllSuperAdmins() {
    return this.superAdminModel.find().exec();
  }

  async createSuperAdmin(createSuperAdminDto: CreateSuperAdminDto) {
    const superAdmin = new this.superAdminModel(createSuperAdminDto);
    return superAdmin.save();
  }

  async loginSuperAdmin(loginDto: LoginDto) {
    const superAdmin = await this.superAdminModel.findOne({
      email: loginDto.email,
    });

    if (!superAdmin) {
      throw new HttpException('Super admin not found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = superAdmin.validatePassword(loginDto.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const token = superAdmin.generateToken();

    return {
      message: 'Login successful',
      token: token,
    };
  }
}
