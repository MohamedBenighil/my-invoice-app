import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

import { db } from "@/db";
import { Custumers, Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export default async function Home() {
  const { userId } = auth();
  const results = await db
    .select()
    .from(Invoices)
    .innerJoin(Custumers, eq(Custumers.id, Invoices.customerId))
    .where(eq(Invoices.userId, userId));

  const invoices = results?.map(({ invoices, custumers }) => {
    return { ...invoices, custumer: custumers };
  });

  return (
    // use h-screen instead of h-full, because h-full is relative and works only with parent where the hight is defined
    <main className=" h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p>
            <Button className="inline-flex gap-2" variant="ghost" asChild>
              <Link href="/invoices/new">
                {/* we removed default margin right (mr-2) and we used a "inline-flex gap-2" className in parent  */}
                <CirclePlus className="h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">Date</TableHead>
              <TableHead className="text-left p-4">Customer</TableHead>
              <TableHead className="text-left p-4">Email</TableHead>
              <TableHead className="text-center p-4">Status</TableHead>
              <TableHead className="text-left p-4">Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((result) => {
              return (
                <TableRow key={result.id}>
                  <TableCell className="p-0 text-left ">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold block p-4"
                    >
                      {new Date(result.createTs).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-left ">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold block p-4"
                    >
                      {result.custumer.name}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-left ">
                    <Link className="block p-4" href={`/invoices/${result.id}`}>
                      {result.custumer.email}
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-center">
                    <Link className="block p-4" href={`/invoices/${result.id}`}>
                      <Badge
                        className={cn(
                          "rounded-full capitalize",
                          result.status === "open" && "bg-blue-500",
                          result.status === "paid" && "bg-green-600",
                          result.status === "void" && "bg-zinc-500",
                          result.status === "uncollectible" && "bg-red-600"
                        )}
                      >
                        {result.status}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="p-0 text-left">
                    <Link
                      href={`/invoices/${result.id}`}
                      className="font-semibold block p-4"
                    >
                      ${(result.value / 100).toFixed(2)}
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
