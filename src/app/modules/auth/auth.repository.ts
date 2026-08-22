import { eq } from 'drizzle-orm';
import { db } from '../../../db/drizzel.js';
import { users } from '../../../db/schema/user.schema.js';
import type { SignUpDto } from './auth.dto.js';

export class AuthRepository {
  public async findUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }
  public async createUser(payload: SignUpDto) {
    // console.log('hello from repository', payload);
    const result = await db
      .insert(users)
      .values({
        userName: payload.user_name,
        email: payload.email,
        password: payload.password,
      })
      .returning();
    console.log(result);
    return result[0] || null;
  }
}
