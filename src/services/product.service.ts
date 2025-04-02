import { prisma } from "@/lib/prisma";

export function getProducts() {
  const products = prisma.product.findMany();

  return products;
}
