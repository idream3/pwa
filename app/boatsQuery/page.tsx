"use client"

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";


export default function Page() {
  const param = useSearchParams();
  return (
    <>
      <h1>Boat {param.get("type")}</h1>
      <Link href="/">Home</Link>
    </>
  );
}