"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>

      <p className="text-muted-foreground text-sm">
        {error.message || "Failed to load user details"}
      </p>

      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
