import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type Product = Prisma.ProductUncheckedCreateWithoutItemInput;

export async function getProducts() {
  const products = await prisma.product.findMany({ include: { brand: true } });

  return products;
}

export async function getProductById(id: number) {
  const product = prisma.product.findUnique({
    where: { id },
    include: { brand: true },
  });

  return product;
}

export async function searchProductsByName(name: string) {
  const products = prisma.product.findMany({
    where: {
      name: { contains: name },
    },
    include: { brand: true },
  });

  return products;
}

export async function searchProductByNameAndBrandName(name: string) {
  const products = prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { brand: { name: { contains: name } } },
      ],
    },
    include: { brand: true },
  });

  return products;
}

export async function insertProduct(rawProduct: Product) {
  const product = prisma.product.create({
    data: {
      brand_id: rawProduct.brand_id,
      category: rawProduct.category,
      name: rawProduct.name,
      weight: rawProduct?.weight ?? null,
    },
  });

  return product;
}
