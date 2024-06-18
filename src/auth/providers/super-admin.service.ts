import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SuperAdmin } from '../schemas/super-admin.schema';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateSuperAdminReqBody,
  UpdateSuperAdminReqBody,
} from '../dtos/super-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginReqBody } from '../dtos/login.dto';
import { PaginationRequest } from 'src/common/middleware/pagination.middleware';

@Injectable()
export class SuperAdminService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(SuperAdmin.name) private superAdminModel: Model<SuperAdmin>,
  ) {}

  async createSuperAdmin(createSuperAdminReqBody: CreateSuperAdminReqBody) {
    const { email } = createSuperAdminReqBody;
    const ifExists = await this.findByQuery({ email });

    if (ifExists) {
      throw new HttpException(
        'Super admin already exists with this email',
        HttpStatus.BAD_REQUEST,
      );
    }

    const superAdmin = new this.superAdminModel(createSuperAdminReqBody);
    return superAdmin.save();
  }

  async getAllWithPagination(req: PaginationRequest) {
    const { sort, limit, skip, search } = req.meta;

    // query for search via name and email
    const searchQuery = {
      $or: [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };

    const data = await this.superAdminModel
      .find(searchQuery)
      .select('-password')
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .exec();

    const count = await this.superAdminModel.countDocuments(searchQuery);

    req.meta.docsInPage = data.length;
    req.meta.totalDocs = count;
    req.meta.totalPages = Math.ceil(count / limit);

    return {
      ...req.meta,
      doc: data,
    };
  }

  async getByID(id: string) {
    const data = await this.superAdminModel
      .findById(id)
      .select('-password')
      .exec();

    if (!data) {
      throw new HttpException('Super admin not found', HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async getAllSuperAdmins() {
    return this.superAdminModel.find().select('-password').exec();
  }

  async update(id: string, updateSuperAdminReqBody: UpdateSuperAdminReqBody) {
    const superAdmin = await this.superAdminModel.findByIdAndUpdate(
      id,
      updateSuperAdminReqBody,
      { new: true },
    );

    if (!superAdmin) {
      throw new HttpException('Super admin not found', HttpStatus.NOT_FOUND);
    }

    return superAdmin;
  }

  async delete(id: string) {
    const superAdmin = await this.superAdminModel.findByIdAndDelete(id).exec();

    if (!superAdmin) {
      throw new HttpException('Super admin not found', HttpStatus.NOT_FOUND);
    }

    return superAdmin;
  }

  async findByQuery(query: FilterQuery<SuperAdmin>) {
    return this.superAdminModel.findOne(query).exec();
  }

  async superAdminLogin(loginDto: LoginReqBody) {
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
      accessToken: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  // get self super admin
  async getSelf(token: string) {
    const decoded = this.jwtService.decode(token.split(' ')[1]) as {
      _id: string;
    };
    const superAdmin = await this.superAdminModel
      .findById(decoded._id)
      .select('-password')
      .exec();

    if (!superAdmin) {
      throw new HttpException('Super admin not found', HttpStatus.NOT_FOUND);
    }

    return superAdmin;
  }
}
