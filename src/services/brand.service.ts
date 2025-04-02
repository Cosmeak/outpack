import { prisma } from "@/lib/prisma";

export async function getBrands() {
  const brands = prisma.brand.findMany();

  return brands;
}

export async function getBrand(id: number) {
  const brand = prisma.brand.findUnique({
    where: {
      id,
    },
  });

  return brand;
}

// export async function insertBrand(brand) {
//   // TODO
// }
