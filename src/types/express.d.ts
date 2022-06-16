import * as Entity from '../shared/entities/user/user.entity';

declare global {
  namespace Express {
    export interface User extends Entity.User {}
    interface Request {
      user: User;
    }
  }
}
