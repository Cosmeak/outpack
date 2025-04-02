import {
  getProducts,
  insertProduct,
  searchProductsByName,
} from "@/services/product.service";
import { productFormValidator } from "@/validators/product.validator";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}

export async function POST(request: NextRequest) {
  try {
    const rawProduct = productFormValidator.parse(await request.formData());
    if ((await searchProductsByName(rawProduct.name)).length >= 1)
      throw new Error("A product with this name already exists.");

    const product = insertProduct(rawProduct);
    return NextResponse.json({ data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}
