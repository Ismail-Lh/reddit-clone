import prisma from '@/lib/prisma';

async function isUsernameExist(username: string): Promise<boolean> {
  const isUserExist = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return !!isUserExist;
}

export default isUsernameExist;
