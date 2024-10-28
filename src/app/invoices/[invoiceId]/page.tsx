import { db } from "@/db";
import { Invoices, Custumers } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";
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

  // read from db: Not only Invoices tab but both (Invoices and Custumers)
  const [result] = await db
    .select()
    .from(Invoices)
    .innerJoin(Custumers, eq(Custumers.id, Invoices.customerId))
    .where(and(eq(Invoices.id, invoiceId), eq(Invoices.userId, userId)))
    .limit(1);
  console.log(result);

  // get 404
  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    custumer: result.custumers,
  };

  console.log(invoice);
  return <Invoice invoice={invoice} />;
}
