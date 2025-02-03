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


      <div><a href="/about">About (a)</a></div>
      <div><Link href="/about" prefetch={false} shallow={true}>About (Link)</Link></div>
      <div><Link href="/about?blah=blah" prefetch={false} shallow={true}>About with search params (Link)</Link></div>


      <div style={{cursor: "pointer"}} onClick={() => {
        router.push("/about");
      }}>About (router push)</div>

      <div onClick={() => {
        router.push("/docs");
      }}>Docss (router push)</div>
     
    </>
  );
}
