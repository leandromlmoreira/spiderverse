import { NextResponse } from "next/server";

import JSONData from "./heroes.json";

export async function GET() {
  const url = `${process.env.API_URL}/api/heroes`;
  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json({ data });
  }

  return NextResponse.json({ data: JSONData });
}
