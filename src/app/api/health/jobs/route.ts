import { NextResponse } from "next/server";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      {
        ok: false,
        databaseUrl: "missing",
        error: "DATABASE_URL is not configured for this deployment.",
      },
      { status: 500 },
    );
  }

  try {
    const { sequelize } = await import("@/lib/jobserver/db");
    await sequelize.authenticate();
    return NextResponse.json({ ok: true, databaseUrl: "configured", database: "connected" });
  } catch (err: any) {
    return NextResponse.json(
      {
        ok: false,
        databaseUrl: "configured",
        database: "failed",
        error: err.message,
      },
      { status: 500 },
    );
  }
}
