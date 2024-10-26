"use client";

import { Invoices } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";

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

interface InvoiceProps {
  invoice: typeof Invoices.$inferSelect;
}

export default function Invoice({ invoice }: InvoiceProps) {
  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          {/*flex items-center makes Invoices and <badge> inline inside <h1>*/}
          <h1 className=" flex items-center gap-4 text-3xl font-bold">
            Invoices {invoice.id}
            <Badge
              className={cn(
                "flex rounded-full capitalize",
                invoice.status === "open" && "bg-blue-500",
                invoice.status === "paid" && "bg-green-600",
                invoice.status === "void" && "bg-zinc-500",
                invoice.status === "uncollectible" && "bg-red-600"
              )}
            >
              {invoice.status}
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
                        <input type="hidden" name="id" value={invoice.id} />
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
        <p className="text-3xl mb-3">${(invoice.value / 100).toFixed(2)}</p>
        <p className="text-lg mb-8"> {invoice.description}</p>
        <h2 className="font-bold text-lg mb-8">Billing details</h2>
        {/* gap-2 works with grid in <ul>*/}
        <ul className="grid gap-2">
          {/* gap-4 works with flex (inline) in <li> */}
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice ID
            </strong>
            <span>{invoice.id}</span>
          </li>
          <li className="flex gap-4">
            <strong className="block w-28 flex-shrink-0 font-medium text-sm">
              Invoice Date
            </strong>
            <span> {new Date(invoice.createTs).toLocaleDateString()}</span>
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
