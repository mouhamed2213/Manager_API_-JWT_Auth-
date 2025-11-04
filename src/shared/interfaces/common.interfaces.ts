export interface Payload {
  sub: number;
  email: string;
  userRole: string;
  iat?: number;
  exp?: number;
}
