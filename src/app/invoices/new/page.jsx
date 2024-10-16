import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/button";
import { sql } from "drizzle-orm";
import { db } from "@/db";

export default async function Home() {
  const result = await db.execute(sql`SELECT current_database()`);
  console.log(result);
  return (
    // use h-screen instead of h-full, because h-full is relative and works only with parent where the hight is defined
    <main className="flex flex-col justify-left h-full  max-w-5xl mx-auto gap-6 my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create invoices</h1>
      </div>
      <div className="flex justify-between"></div>
      {JSON.stringify(result)}
      <form className="grid gap-4 max-w-xs">
        <div>
          <Label className="block font-semibold text-sm mb-2" htmlFor="name">
            Billing name
          </Label>
          <Input type="text" name="name" id="name" />
        </div>
        <div>
          <Label className="block font-semibold text-sm mb-2" htmlFor="email">
            Billing email
          </Label>
          <Input type="email" name="email" id="email" />
        </div>
        <div>
          <Label className="block font-semibold text-sm mb-2" htmlFor="value">
            Value
          </Label>
          <Input type="text" name="value" id="value" />
        </div>
        <div>
          <Label className="block font-semibold text-sm mb-2" htmlFor="value">
            Description
          </Label>
          <Textarea type="text" name="value" id="value" />
        </div>
        <div>
          <Button className="w-full font-semibold"> Submit </Button>
        </div>
      </form>
    </main>
  );
}