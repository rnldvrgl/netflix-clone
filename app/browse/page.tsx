"use client"

import Image from 'next/image'
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className='text-green-500'>Netflix Clone
      <button onClick={() => signOut()}>
        sign out
      </button>
    </div>
  )
}
