import { getItems, insertItem } from "@/services/item.service";
import { itemFormValidator } from "@/validators/item.validator";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const items = await getItems();
    return NextResponse.json({ data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = itemFormValidator.parse(await request.json());
    const item = insertItem(formData);
    return NextResponse.json({ data: item }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500, statusText: error as string });
  }
}
