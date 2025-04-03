import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { itemValidator } from "@/validators/item.validator";
import { BASE_URL, cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Textarea } from "./ui/textarea";
import { Prisma } from "@prisma/client";

type Product = Prisma.ProductGetPayload<{ include: { brand: true } }>;

export function ItemFormDialog() {
  const form = useForm({
    resolver: zodResolver(itemValidator),
  });

  const [user, setUser] = useState<User | null>();
  const [searchedProductsInput, setSearchedProductsInput] = useState("");
  const [searchedProductsResult, setSearchedProductsResult] = useState<
    Product[]
  >([]);

  useEffect(() => {
    if (searchedProductsInput.length >= 2) {
      fetch(`${BASE_URL}/api/products?search=${searchedProductsInput}`)
        .then((response) => response.json())
        .then((response) => setSearchedProductsResult(response.data));
    }

    if (!user) {
      const supabase = createClient();
      supabase.auth.getUser().then((response) => setUser(response.data.user));
    }
  }, [searchedProductsInput, user]);

  function handleSubmit(formData: {
    name: string;
    product_id: number;
    quantity?: number | undefined;
    rate?: number | undefined;
    comment?: string | undefined;
    purchased_from?: string | undefined;
    purchased_price?: number | undefined;
    purchased_at?: string | undefined;
  }) {
    fetch(`${BASE_URL}/api/items`, {
      method: "POST",
      body: JSON.stringify(formData),
    }).then((response) => console.log(response));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus /> New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>New inventory item</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Camel bag" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "justify-between",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value
                              ? searchedProductsResult.find(
                                  (product: Product) =>
                                    product.id === field.value,
                                )?.name
                              : "Search..."}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command shouldFilter={false}>
                          <CommandInput
                            placeholder="Search..."
                            onValueChange={setSearchedProductsInput}
                            value={searchedProductsInput}
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>
                              {searchedProductsInput === ""
                                ? "Start typing to load results"
                                : "No results found."}
                            </CommandEmpty>
                            <CommandGroup>
                              {searchedProductsResult.map(
                                (product: Product) => (
                                  <CommandItem
                                    value={product.id?.toString()}
                                    key={product.id}
                                    itemType="number"
                                    onSelect={() => {
                                      form.setValue("product_id", product.id!);
                                    }}
                                  >
                                    {product.brand?.name} - {product.name}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        product.id === field.value
                                          ? "opacity-100"
                                          : "opacity-0",
                                      )}
                                    />
                                  </CommandItem>
                                ),
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="rate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rate</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="0 to 5"
                          min={0}
                          max={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchased_from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchased from</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Amazon" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchased_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchased price</FormLabel>
                      <FormControl>
                        <Input {...field} type="number" placeholder="0.00" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="purchased_at"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchased at</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="2025-04-01" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Something to remind about this item?"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full mt-4">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
