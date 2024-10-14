import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    // use h-screen instead of h-full, because h-full is relative and works only with parent where the hight is defined
    <main className="flex flex-col justify-center h-screen text-center max-w-5xl mx-auto gap-6">
      <h1 className="text-5xl font-bold">Invoicipedia</h1>
      <p>
        <Button asChild>
          <Link href="/dashboard">Login</Link>
        </Button>
      </p>
    </main>
  );
}
