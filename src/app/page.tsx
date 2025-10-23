import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6">
      <main className="max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-black dark:text-white">
          Fredrik Etsare
        </h1>
        <Navbar />
        <p></p>
        
      </main>
    </div>
  );
}
