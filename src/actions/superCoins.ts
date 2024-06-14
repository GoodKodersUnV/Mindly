import { db } from "@/lib/db";

export  const  useSuperCoins = async (id: string) => {
  const user = await db.user.update({
    where: {
      id,
    },
    data: {
      supercoins: {
        decrement: 1,
      },
    },
  });

  return user;
};
