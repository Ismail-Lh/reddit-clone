import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import prisma from '@/lib/prisma';
import getMessageError from '@/actions/getMessageError';
import isUsernameExist from '@/actions/isUsernameExist';

export async function POST(req: Request) {
  try {
    const cookieStore = cookies();
    const { username, password } = await req.json();

    // Check if the provide username is already taken by another user
    const isUserExist = await isUsernameExist(username);

    if (isUserExist)
      throw new Error(
        'Provided username already exist. Please try another one.'
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    // @ts-ignore
    delete user.password;

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    cookieStore.set('token', token);

    return NextResponse.json({ success: true, user });
  } catch (error: unknown) {
    return NextResponse.json({ success: false, error: getMessageError(error) });
  }
}
