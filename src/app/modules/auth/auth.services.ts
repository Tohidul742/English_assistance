import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository.js';
import { LoginDto, SignUpDto } from './auth.dto.js';
import { AuthMapper } from './auth.mapper.js';
import type { IAuthResponse } from './auth.types.js';
import { AuthConstraints } from './auth.constraint.js';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  public async login(payload: LoginDto): Promise<IAuthResponse> {
    const user = await this.authRepository.findUserByEmail(payload.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const jwtSecret = process.env.JWT_SECRET || 'secret';
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
      expiresIn: AuthConstraints.TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = jwt.sign({ userId: user.id, email: user.email }, jwtRefreshSecret, {
      expiresIn: AuthConstraints.REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return AuthMapper.toAuthResponse(user, token, refreshToken);
  }

  public async SignUp(payload: SignUpDto): Promise<IAuthResponse> {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const user = await this.authRepository.createUser({
      user_name: payload.user_name,
      email: payload.email,
      password: hashedPassword,
    });
    if (!user) {
      throw new Error('Failed to create user account');
    }

    const jwtSecret = process.env.JWT_SECRET || 'secret';
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

    const token = jwt.sign({ userId: user.id, email: user.email }, jwtSecret, {
      expiresIn: AuthConstraints.TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = jwt.sign({ userId: user.id, email: user.email }, jwtRefreshSecret, {
      expiresIn: AuthConstraints.REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return AuthMapper.toAuthResponse(user, token, refreshToken);
  }

  public async refreshToken(token: string): Promise<IAuthResponse> {
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'refresh-secret';

    try {
      const decoded = jwt.verify(token, jwtRefreshSecret) as { userId: number; email: string };
      // In a real app, you might want to fetch the user again to ensure they still exist and are active

      const jwtSecret = process.env.JWT_SECRET || 'secret';
      const newAccessToken = jwt.sign({ userId: decoded.userId, email: decoded.email }, jwtSecret, {
        expiresIn: AuthConstraints.TOKEN_EXPIRATION_TIME,
      });

      return {
        user: {
          id: decoded.userId.toString(),
          userName: '', // Optionally fetch from DB
          email: decoded.email,
        },
        accessToken: newAccessToken,
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
