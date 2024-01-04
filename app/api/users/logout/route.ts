import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import getMessageError from '@/actions/getMessageError';

export function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete('token');

    return NextResponse.json({ success: true, message: 'Logout successful' });
  } catch (error: unknown) {
    const errorMessage = getMessageError(error);
    return NextResponse.json({ success: false, message: errorMessage });
  }
}
