import type { Request, Response } from 'express';
import { AuthService } from './auth.services.js';
import { LoginDto, SignUpDto } from './auth.dto.js';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const payload: LoginDto = req.body;
      const result = await this.authService.login(payload);

      const { refreshToken } = result;

      // Set cookie for web clients
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Return both tokens in JSON for mobile clients
      res.status(200).json({
        success: true,
        message: 'User logged in successfully',
        data: result,
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message || 'Authentication failed',
      });
    }
  };

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const playload: SignUpDto = req.body;
      const result = await this.authService.SignUp(playload);

      const { refreshToken } = result;

      // Set cookie for web clients
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Return both tokens in JSON for mobile clients
      res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (err: any) {
      res.status(422).json({
        success: false,
        message: err.message || 'Registration failed',
      });
    }
  };

  public refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      // Support both mobile (body) and web (cookie)
      const token = req.body.refreshToken || req.cookies?.refreshToken;

      if (!token) {
        res.status(401).json({ success: false, message: 'Refresh token not found' });
        return;
      }

      const result = await this.authService.refreshToken(token);

      res.status(200).json({
        success: true,
        message: 'Access token refreshed successfully',
        data: result, // Contains the new accessToken
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message || 'Invalid or expired refresh token',
      });
    }
  };
}
