import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await prisma.winTeam.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json(data);
}
