import { Button } from "@radix-ui/themes"
import Link from "next/link"

interface Issue {
    id: number;
    title: string;
    description: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}

const page = () => {
  return (
    <div>
        <Button>
            <Link href='/issues/new'>New Issue</Link>
        </Button>
    </div>
  )
}

export default page