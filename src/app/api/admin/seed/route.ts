import { NextRequest, NextResponse } from "next/server";
import { seedSuperAdminIfEmpty } from "@/lib/jobserver/db/seed";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-seed-secret");
  if (!secret || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await seedSuperAdminIfEmpty();
    return NextResponse.json(result, { status: result.created ? 201 : 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
