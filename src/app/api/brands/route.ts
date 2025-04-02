import { getBrands } from "@/services/brand.service";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json({ data: brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}
