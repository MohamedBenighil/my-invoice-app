import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { AVAILABLE_STATUS } from "@/data/invoices";
import { updateStatusAction } from "@/app/actions";
import { ChevronDown } from "lucide-react";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  // get the invoiceId from url parameter
  const invoiceId = parseInt(params.invoiceId);

  // get userId (to restrict the access to the data to its user )
  const { userId } = auth();

  // best practise to deouble check
  if (!userId) return;

  // when invalid id
  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }

  // read from db
  const [result] = await db
    .select()
    .from(Invoices)
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);

  // get 404
  if (!result) {
    notFound();
  }

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          {/*flex items-center makes Invoices and <badge> inline inside <h1>*/}
          <h1 className=" flex items-center gap-4 text-3xl font-bold">
            Invoices {invoiceId}
            <Badge
              className={cn(
                "flex rounded-full capitalize",
                result.status === "open" && "bg-blue-500",
                result.status === "paid" && "bg-green-600",
                result.status === "void" && "bg-zinc-500",
                result.status === "uncollectible" && "bg-red-600"
              )}
            >
              {result.status}
            </Badge>
          </h1>

          <p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2" variant="outline">
                  Change Status <ChevronDown className="w-4 h-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {AVAILABLE_STATUS.map((status) => {
                  return (
                    <DropdownMenuItem id={status.id}>
                      <form action={updateStatusAction}>
                        <input type="hidden" name="id" value={invoiceId} />
                        <input type="hidden" name="status" value={status.id} />
                        <button>{status.label}</button>
                      </form>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </p>
        </div>
        <p className="text-3xl mb-3">${(result.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-8"> {result.description}</p>
        <h2 className="font-bold text-lg mb-8">Billing details</h2>
        {/* gap-2 works with grid in <ul>*/}
        <ul className="grid gap-2">
          {/* gap-4 works with flex (inline) in <li> */}
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoiceId}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span> {new Date(result.createTs).toLocaleDateString()}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Name
            </strong>
            <span></span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Billing Email
            </strong>
            <span></span>
          </li>
        </ul>
      </Container>
    </main>
  );
}
