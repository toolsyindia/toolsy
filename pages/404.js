import Head from "next/head";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Toolsy AI</title>
      </Head>
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-8xl font-black text-white mb-4">404</h1>
          <p className="text-xl text-gray-400 mb-8">Oops! This page doesn&apos;t exist.</p>
          <Link href="/" className="px-6 py-3 bg-primary text-white font-black rounded-xl hover:bg-primary/90 transition-all">
            Back to Toolsy
          </Link>
        </div>
      </div>
    </>
  );
}