import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-seed-secret");
  if (!secret || secret !== process.env.SEED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { seedSuperAdminIfEmpty } = await import("@/lib/jobserver/db/seed");
    const result = await seedSuperAdminIfEmpty();
    return NextResponse.json(result, { status: result.created ? 201 : 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
