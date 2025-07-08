import { NextResponse } from "next/server";

import JSONData from "./heroes.json";

export async function GET() {
  const url = `${process.env.API_URL}/api/heroes`;
  const res = await fetch(url);

  if (res.ok) {
    // sucesso na API real
    const data = await res.json();
    return NextResponse.json({ data });
  }

  // se deu erro (404, 500, etc), cai aqui e devolve o JSON local
  return NextResponse.json({ data: JSONData });
}
