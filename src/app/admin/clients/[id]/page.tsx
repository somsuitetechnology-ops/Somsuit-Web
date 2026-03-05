import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminClientDetailPage() {
  return (
    <div className="container py-12">
      <p className="text-muted-foreground mb-4">Backend and database have been removed.</p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
