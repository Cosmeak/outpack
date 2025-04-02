import {
  getBrandByName,
  getBrands,
  insertBrand,
} from "@/services/brand.service";
import { brandFormValidator } from "@/validators/brand.validator";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const brands = await getBrands();
    return NextResponse.json({ data: brands }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = brandFormValidator.parse(await request.formData());
    if (await getBrandByName(name))
      throw new Error("A brand with this name already exists.");
    const brand = insertBrand({ name });
    return NextResponse.json({ data: brand }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}
