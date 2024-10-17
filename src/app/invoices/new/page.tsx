"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";
import { createAction } from "@/app/actions";
import { SyntheticEvent, useState, startTransition } from "react";
import SubmitButton from "@/components/SubmitButton";

export default function Home() {
  const [state, setState] = useState("ready");

  // only on client
  async function hundleOnSubmit(event: SyntheticEvent) {
    event.preventDefault();
    if (state === "pending") return;
    setState("pending");

    // to get the value "true" for pending used in SubmitButton (during the submit form)
    // also upgrade to next js 15
    startTransition(async () => {
      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);
      await createAction(formData);
      console.log("hey");
    });
  }
  return (
    // use h-screen instead of h-full, because h-full is relative and works only with parent where the hight is defined
    <main className="flex flex-col justify-left h-full  max-w-5xl mx-auto gap-6 my-12">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create invoices</h1>
      </div>

      <form
        action={createAction}
        onSubmit={hundleOnSubmit}
        className="grid gap-4 max-w-xs"
      >
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
          <Textarea name="description" id="description" />
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </main>
  );
}
