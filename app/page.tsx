"use client";

import type { Metadata } from "next";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter();
  return (
    <>
      <h1>Next.js + Serwist</h1>
      <a href="/about">About (link)</a>


      <div onClick={() => {
        router.push("/about");
      }}>About (router push)</div>

      <div onClick={() => {
        router.push("/docs");
      }}>Docss (router push)</div>
     
    </>
  );
}
