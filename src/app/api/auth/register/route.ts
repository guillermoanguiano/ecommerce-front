import { NextResponse } from "next/server";
import db from "@/libs/prisma";
import { User } from "@/interfaces/User.interface";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data: User = await request.json();

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400, statusText: "Email already exists" }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    });

    const { password: _, ...user } = newUser;

    return NextResponse.json(user, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
