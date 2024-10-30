import { db } from "@/db";
import { Invoices, Custumers } from "@/db/schema";
import { eq, and, isNull } from "drizzle-orm";

import { notFound } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  // get the invoiceId from url parameter
  const invoiceId = parseInt(params.invoiceId);

  // get userId (to restrict the access to the data to its user )
  const { userId, orgId } = auth();

  // best practise to deouble check
  if (!userId) return;

  // when invalid id
  if (isNaN(invoiceId)) {
    throw new Error("Invalid Invoice ID");
  }
  let result;
  if (orgId) {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Custumers, eq(Custumers.id, Invoices.customerId))
      .where(
        and(eq(Invoices.organisationId, orgId), eq(Invoices.id, invoiceId))
      )
      .limit(1);
  } else {
    [result] = await db
      .select()
      .from(Invoices)
      .innerJoin(Custumers, eq(Custumers.id, Invoices.customerId))
      .where(
        and(
          eq(Invoices.id, invoiceId),
          eq(Invoices.userId, userId),
          isNull(Invoices.organisationId)
        )
      )
      .limit(1);
  }

  // get 404
  if (!result) {
    notFound();
  }

  const invoice = {
    ...result.invoices,
    custumer: result.custumers,
  };

  return <Invoice invoice={invoice} />;
}
