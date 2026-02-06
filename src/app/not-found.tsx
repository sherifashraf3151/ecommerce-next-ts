import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 mb-2">

      <div className="relative w-80 h-80 mb-8 animate-[float_4s_ease-in-out_infinite]">
        <Image src="/404.png" alt="404 Illustration" className="rounded-xl shadow-2xl" fill style={{ objectFit: 'contain' }} />
      </div>

      <h1 className="text-6xl md:text-7xl font-extrabold text-blue-700 mb-4 animate-fadeInUp">
        Looks Like You&apos;re Lost!
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-xl text-center animate-fadeInUp delay-100">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>

      <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg transform transition duration-300 hover:scale-105 hover:bg-blue-700 animate-fadeInUp delay-200">
        Return Home
      </Link>

    </div>
  )
}
