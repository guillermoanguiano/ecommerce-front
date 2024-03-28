import { NextResponse } from "next/server";
import db from "@/libs/prisma";
import { User } from "@/interfaces/User.interface";

export async function POST(request: Request) {
  const data: User = await request.json();

  const userFound = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userFound) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  console.log(data);

  const newUser = await db.user.create({
    data,
  });

  return NextResponse.json(newUser, { status: 201 });
}
