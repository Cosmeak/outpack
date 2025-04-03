"use client";

import { ItemFormDialog } from "@/components/item-form-dialog";
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

type Item = Prisma.ItemGetPayload<{
  include: { product: { include: { brand: true } } };
}>;

export default function Inventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<Item[] | []>([]);
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/api/items`)
      .then((response) => response.json())
      .then((response) => {
        setItems(response.data);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="flex gap-2 justify-between mb-4">
        <div />
        <ItemFormDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Purchase from</TableHead>
            <TableHead>Purchase price</TableHead>
            <TableHead>Purchase at</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length ? (
            items.map((item: Item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.product?.brand?.name} - {item.product?.name}
                </TableCell>
                <TableCell>{item.name ?? "-"}</TableCell>
                <TableCell>{item.product?.weight ?? "-"}</TableCell>
                <TableCell>{item.purchased_from ?? "-"}</TableCell>
                <TableCell>{item.purchased_price ?? "-"}</TableCell>
                <TableCell>{item.purchased_at?.toString() ?? "-"}</TableCell>
                <TableCell>TODO: add notes</TableCell>
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
                  "There is nothing available in your inventory..."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
