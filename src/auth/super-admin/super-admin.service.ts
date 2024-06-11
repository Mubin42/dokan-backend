import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from '../schemas/super-admin.schema';
import { FilterQuery, Model } from 'mongoose';
import { CreateSuperAdminDto } from '../dtos/super-admin.dto';
import { LoginDto } from '../dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SuperAdminService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdmin>,
  ) {}

  async getAllSuperAdmins() {
    return this.superAdminModel.find().exec();
  }

  async createSuperAdmin(createSuperAdminDto: CreateSuperAdminDto) {
    const superAdmin = new this.superAdminModel(createSuperAdminDto);
    return superAdmin.save();
  }

  async findOne(id: string) {
    return this.superAdminModel.findById(id).exec();
  }

  async findByQuery(query: FilterQuery<SuperAdmin>) {
    return this.superAdminModel.findOne(query).exec();
  }

  async superAdminLogin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const superAdmin = await this.findByQuery({ email });

    if (!superAdmin) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const isMatch = await superAdmin.validatePassword(password);

    if (!isMatch) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      _id: superAdmin._id,
      email: superAdmin.email,
      name: superAdmin.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
