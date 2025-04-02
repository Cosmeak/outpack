import { getBrand } from "@/services/brand.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    const brands = await getBrand(id);
    return NextResponse.json({ data: brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}
