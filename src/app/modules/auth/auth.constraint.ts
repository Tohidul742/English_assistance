export class AuthConstraints {
  public static readonly PASSWORD_MIN_LENGTH = 6;
  public static readonly TOKEN_EXPIRATION_TIME = '15m'; // Access token is short-lived
  public static readonly REFRESH_TOKEN_EXPIRATION_TIME = '7d';
}
