import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function InvoicePage({
  params,
}: {
  params: { invoiceId: string };
}) {
  // get the invoiceId from url parameter
  const invoiceId = parseInt(params.invoiceId);

  // read from db
  const [result] = await db
    .select()
    .from(Invoices)
    .where(eq(Invoices.id, invoiceId))
    .limit(1);

  //result.status = "uncollectible";
  console.log("results: ", result);

  return (
    <main className=" h-full max-w-5xl mx-auto gap-6 my-12">
      <div className="flex justify-between">
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

        <p></p>
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
    </main>
  );
}
