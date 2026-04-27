"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProductPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/#fleet-intelligence");
  }, [router]);
  return null;
}
