import Link from "next/link";
import { Button } from "@radix-ui/themes"

export default function Home() {
  return (
    <main>
      <Button>
            <Link href="/users">Users</Link>
        </Button>
    </main>
  );
}