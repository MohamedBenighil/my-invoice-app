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
import { Invoices } from "@/db/schema";

export default async function Home() {
  const results = await db.select().from(Invoices);
  console.log(results);
  return (
    // use h-screen instead of h-full, because h-full is relative and works only with parent where the hight is defined
    <main className="flex flex-col justify-center h-full text-center max-w-5xl mx-auto gap-6 my-12">
      <div className="flex justify-between">
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
          {results.map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className="text-left p-4">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold"
                  >
                    {new Date(result.createTs).toLocaleDateString()}
                  </Link>
                </TableCell>
                <TableCell className="text-left p-4">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold"
                  >
                    Philipp J. Fry
                  </Link>
                </TableCell>
                <TableCell className="text-left p-4">
                  <Link href={`/invoices/${result.id}`}>fry@yahoo.com</Link>
                </TableCell>
                <TableCell className="text-center p-4">
                  <Link href={`/invoices/${result.id}`}>
                    <Badge className="rounded-full">{result.status}</Badge>
                  </Link>
                </TableCell>
                <TableCell className="text-left p-4">
                  <Link
                    href={`/invoices/${result.id}`}
                    className="font-semibold"
                  >
                    ${(result.value / 100).toFixed(2)}
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
