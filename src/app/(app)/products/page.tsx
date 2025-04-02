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
import { Product } from "@/validators/product.validator";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<Product[] | []>([]);
  useEffect(() => {
    fetch(`${BASE_URL}/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data.data));
  }, []);

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          <TableRow>
            <TableHead className="w-[100px]">Brand</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Global Rate</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: Product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">
                {product?.brand ? product.brand.name : "-"}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>-</TableCell>
              <TableCell className="text-right">-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
