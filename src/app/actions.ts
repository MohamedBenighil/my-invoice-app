// be careful about the function you export (if there is a sensetive data)
"use server";
import { db } from "@/db";
import { Invoices, Status } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createAction(formdata: FormData) {
  const { userId } = auth();

  // get the data from the form
  const value = Math.floor(parseFloat(String(formdata.get("value"))) * 100);
  const description = formdata.get("description") as string;
  // we don't used the status, because when we create invoice, it is "open" by default

  // make sur there is a user athenticated before making request
  if (!userId) {
    return;
  }
  //insert the data
  const results = await db
    .insert(Invoices)
    .values({ value, description, userId, status: "open" })
    .returning({ id: Invoices.id });
  redirect(`/invoices/${results[0].id}`);
}

export async function updateStatusAction(formdata: FormData) {
  // first thing : check user id
  const { userId } = auth();
  if (!userId) {
    return;
  }

  const id = formdata.get("id") as string;
  const status = formdata.get("status") as Status; // instead of "as String"
  console.log("-----------------------------------------------");
  console.log("id", id);
  console.log("status", status);
  console.log("-----------------------------------------------");

  // proceed to update
  const results = await db
    .update(Invoices)
    .set({ status })
    .where(and(eq(Invoices.id, parseInt(id)), eq(Invoices.userId, userId)));

  // verify it works
  console.log("results :", results);
}
