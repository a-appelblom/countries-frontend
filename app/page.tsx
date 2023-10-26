"use client";

import { useEffect, useState } from "react";
import GetCountry from "./(components)/GetCountry";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!window) return;
    const token = getCookie("token");
    if (!token) router.push("/signin");
  }, [router]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between p-24">
      <div className="w-full">
        <button className="tex-xl hover:text-gray-400">
          <Link href="/saved">Go to saved -&gt;</Link>
        </button>
        <GetCountry />
      </div>
    </main>
  );
}
