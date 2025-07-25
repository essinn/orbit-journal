import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let dbUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          id: user.id,
          email: user.email || "",
          firstName: user.given_name || "",
          lastName: user.family_name || "",
          profileImage: user.picture || "",
        },
      });
    }
  } catch (error) {
    console.error("Prisma user creation error:", error);
  }

  return NextResponse.redirect("http://localhost:3000/");
}
