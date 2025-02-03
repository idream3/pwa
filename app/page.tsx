"use client";

import type { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Next.js + Serwist</h1>
      <div><img src="/dog.jpeg" alt="Dog" /></div>


      <a href="/about">About (a)</a>

      <Link href="/about">About (Link)</Link>


      <div style={{cursor: "pointer"}} onClick={() => {
        router.push("/about");
      }}>About (router push)</div>

      <div onClick={() => {
        router.push("/docs");
      }}>Docss (router push)</div>
     
    </>
  );
}
