"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Next.js + Serwist</h1>
      <Link href="/about">About (link)</Link>

      <div onClick={() => {
        router.push("/about");
      }}>About (router push)</div>

      <div onClick={() => {
        router.push("/docs");
      }}>Docs (router push)</div>

      {["yacht", "sailboat", "motorboat"].map((type) => (
        <div>
        <Link key={type} href={`/boats/${type}`}>
          {type}
        </Link>
        </div>
      ))}

      {["yacht", "sailboat", "motorboat"].map((type) => (
        <div>
        <Link key={type} href={`/boatsQuery?type=${type}`}>
          {type}
        </Link>
        </div>
      ))}
    </>
  );
}
