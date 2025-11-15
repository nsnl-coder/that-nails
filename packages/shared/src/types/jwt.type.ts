import { JWT_TOKEN } from '../enum';

export interface ParsedJwtPayload {
  type: JWT_TOKEN;
  user_id: number;
  iat: number;
}
