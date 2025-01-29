"use client"

import Link from "next/link";
import { useParams } from "next/navigation";


export default function Page() {
  const param = useParams();
  return (
    <>
      <h1>Boat {param.type}</h1>
      <Link href="/">Home</Link>
    </>
  );
}