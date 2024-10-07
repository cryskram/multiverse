import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
  const {
    name,
    clue,
    late = false,
  }: { name: string; clue: string; late?: boolean } = await request.json();
  try {
    const createEntry = await prisma.winTeam.create({
      data: {
        team: name,
        code: late ? "late" : clue,
      },
    });

    if (!late) {
      const deleteData = await prisma.clue.delete({
        where: {
          text: createEntry["code"] as string,
        },
      });
    }

    return NextResponse.json({ message: "Done" }, { status: 200 });
  } catch (e) {
    console.error("error: ", e);
    return NextResponse.json(
      { error: "Failed to record submission" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const data = await prisma.clue.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(data);
}
