import type { IAuthResponse } from './auth.types.js';

export class AuthMapper {
  public static toAuthResponse(user: any, token: string, refreshToken?: string): IAuthResponse {
    return {
      user: {
        id: user.id,
        userName: user.userName,
        email: user.email,
      },
      accessToken: token,
      ...(refreshToken && { refreshToken }),
    };
  }
}
