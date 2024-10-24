// be careful about the function you export (if there is a sensetive data)
"use server";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
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
