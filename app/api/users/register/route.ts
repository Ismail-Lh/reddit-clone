import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';
import isUsernameExist from '@/actions/isUsernameExist';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Check if the provide username is already taken by another user
    const isUserExist = await isUsernameExist(username);

    if (isUserExist)
      return NextResponse.json({
        success: false,
        error: 'Provided username already exist. Please try another one.',
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    // @ts-ignore
    delete user.password;

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
