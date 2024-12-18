// be careful about the function you export (if there is a sensetive data)
"use server";
import { db } from "@/db";
import { Invoices, Status, Custumers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAction(formdata: FormData) {
  const { userId, orgId } = auth();

  // make sur there is a user athenticated before making request
  if (!userId) {
    return;
  }

  // get the data from the form
  const value = Math.floor(parseFloat(String(formdata.get("value"))) * 100);
  const description = formdata.get("description") as string;
  const name = formdata.get("name") as string;
  const email = formdata.get("email") as string;
  // we don't used the status, because when we create invoice, it is "open" by default

  //insert the data in Custumers table first (because Invoice has a reference to Customers)
  // returned value is object having id : returning({ id: Custumers.id });
  const [custumer] = await db
    .insert(Custumers)
    .values({ name, email, userId, organisationId: orgId || null }) // instead of undefined
    .returning({ id: Custumers.id });

  //insert the data in Invoices table with customerId got from previous
  const results = await db
    .insert(Invoices)
    .values({
      value,
      description,
      userId,
      status: "open",
      customerId: custumer.id,
      organisationId: orgId || null, // instead of undefined
    })
    .returning({ id: Invoices.id });
  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formdata: FormData) {
  // first thing : check user id
  const { userId, orgId } = auth();
  if (!userId) {
    return;
  }

  const id = formdata.get("id") as string;
  const status = formdata.get("status") as Status; // instead of "as String"

  let results;
  if (orgId) {
    results = await db
      .update(Invoices)
      .set({ status })
      .where(
        and(eq(Invoices.id, parseInt(id)), eq(Invoices.organisationId, orgId))
      );
  } else {
    results = await db
      .update(Invoices)
      .set({ status })
      .where(
        and(
          eq(Invoices.id, parseInt(id)),
          eq(Invoices.userId, userId),
          isNull(Invoices.organisationId)
        )
      );
  }

  // get the change witout refreshing
  revalidatePath(`invoices/${id}`, "page");
}

export async function deleteInvoiceAction(formdata: FormData) {
  const { userId, orgId } = auth();
  // make sur there is a user athenticated before making request
  if (!userId) {
    return;
  }

  // get the id from the form
  const id = Number(formdata.get("id"));
  let result;
  if (orgId) {
    result = await db
      .delete(Invoices)
      .where(and(eq(Invoices.id, id), eq(Invoices.organisationId, orgId)));
  } else {
    result = await db
      .delete(Invoices)
      .where(
        and(
          eq(Invoices.id, id),
          eq(Invoices.userId, userId),
          isNull(Invoices.organisationId)
        )
      );
  }

  // go to dahsboard
  redirect("/dashboard");
}
