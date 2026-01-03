"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-500 border-t-transparent" />
        <p className="text-amber-800 font-medium">Loading...</p>
      </div>
    </div>
  );
}
