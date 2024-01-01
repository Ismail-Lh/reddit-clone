import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken';

import prisma from '@/lib/prisma';

async function fetchUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  if (!token) return null;

  const payload = jwt.verify(
    token.value,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  const user = await prisma.user.findFirst({
    where: { id: payload.userId },
  });

  // @ts-ignore
  delete user?.password;

  return user;
}

export default fetchUser;
