"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { LoaderPinwheel } from "lucide-react";
import { useEffect, useState } from "react";

type Product = Prisma.ProductGetPayload<{ include: { brand: true } }>;

export default function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | []>([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Brand</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Global Rate</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length ? (
          products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                {product?.brand ? product.brand.name : "-"}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="text-right">-</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center font-medium p-4 text-base"
            >
              {isLoading ? (
                <LoaderPinwheel className="animate-spin mx-auto" />
              ) : (
                "No product are available, retry later."
              )}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
