import React from "react";
import Image from "next/image";

const Page = () => {
  return (
    <main className="root-container flex min-h-screen flex-col items-center gap-12 p-12">
      <Image
        src="/images/slow-down.png"
        alt="Turtle holding slow down sign"
        width={500}
        height={500}
      />
      <div className="text-center">
        <h1 className="font-bebas-neue text-5xl font-bold text-light-100">
          Whoa!
        </h1>
        <h2 className="mt-3 font-bebas-neue text-4xl font-bold text-light-200">
          Slow down there, Speedy!
        </h2>
        <p className="mt-6 max-w-xl text-center text-light-400">
          Looks like you&apos;ve been a little too eager. We&apos;ve put a
          temporary pause on your excitment. 🚦 Chill for a bit and tray again
          shortly.
        </p>
      </div>
    </main>
  );
};
export default Page;
