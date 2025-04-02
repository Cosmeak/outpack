import { getProductById } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = parseInt((await params).id);
    const product = await getProductById(id);
    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}
