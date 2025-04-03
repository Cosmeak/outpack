import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { Item } from "@/validators/item.validator";

export async function getItems() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No user logged in.");

  const items = prisma.item.findMany({
    where: { user_id: { equals: user.id } },
    include: { product: { include: { brand: true } } },
  });

  return items;
}

export async function insertItem(rawItem: Item) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("No user logged in.");

  const item = prisma.item.create({
    data: {
      user_id: user.id,
      product_id: rawItem.product_id,
      name: rawItem.name,
      rate: rawItem.rate,
      purchased_from: rawItem.purchased_from,
      purchased_at: rawItem.purchased_at,
      purchased_price: rawItem.purchased_price,
      comment: rawItem.comment,
    },
  });

  return item;
}
