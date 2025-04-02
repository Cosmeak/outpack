import { prisma } from "@/lib/prisma";
import { Brand } from "@/validators/brand.validator";

export async function getBrands() {
  const brands = prisma.brand.findMany();

  return brands;
}

export async function getBrandById(id: number) {
  const brand = prisma.brand.findUnique({
    where: {
      id,
    },
  });

  return brand;
}

// TODO: replace by a search like name (searchBrandByName)
export async function getBrandByName(name: string) {
  const brand = prisma.brand.findFirst({
    where: {
      name,
    },
  });

  return brand;
}

export async function insertBrand(rawBrand: Brand) {
  const brand = prisma.brand.create({
    data: {
      name: rawBrand.name,
    },
  });

  return brand;
}
