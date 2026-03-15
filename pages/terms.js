import Head from "next/head";

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service | Toolsy AI</title>
      </Head>
      <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Last Updated: March 2026</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-500 mb-6">By accessing and using Toolsy, you accept and agree to be bound by the terms and provision of this agreement.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Accuracy of Information</h2>
          <p className="text-gray-500 mb-6">Toolsy indexes thousands of AI tools. While we strive to keep our information updated, AI tool prices, features, and availability change rapidly. We do not guarantee the accuracy of pricing or descriptions on this site. Always verify on the official tool&apos;s website.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Prohibited Conduct</h2>
          <p className="text-gray-500 mb-6">You are prohibited from using automated scripts, bots, or scrapers to extract data, tool lists, or contact information from Toolsy. We reserve the right to block any IP address engaging in data scraping.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Intellectual Property</h2>
          <p className="text-gray-500">All tool logos, names, and trademarks belong to their respective owners. Toolsy claims no ownership over the third-party AI tools listed in our directory.</p>
        </div>
      </div>
    </>
  );
}