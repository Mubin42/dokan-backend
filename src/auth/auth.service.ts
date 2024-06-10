import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { _id: user._id, email: user.email };
    console.log('JWT_SECRET:', process.env.JWT_SECRET); // Add this line for debugging
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
