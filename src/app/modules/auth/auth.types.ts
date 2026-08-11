export interface IAuthResponse {
  user: {
    id: string;
    userName: string;
    email: string;
  };
  accessToken: string;
  refreshToken?: string;
}
