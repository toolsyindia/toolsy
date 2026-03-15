import Head from "next/head";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Toolsy AI</title>
      </Head>
      <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
          <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last Updated: March 2026</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p className="text-gray-500 mb-6">We collect basic analytics data (like your IP address and browsing behavior on our site) using standard cookies to improve the Toolsy experience. We do not collect personal data unless you voluntarily submit it via our contact form.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Affiliate Disclosure (Monetization)</h2>
          <p className="text-gray-500 mb-6">Toolsy is a directory of third-party AI tools. We participate in various affiliate marketing programs. This means if you click on a tool link and make a purchase, we may earn a commission at no extra cost to you. This helps keep our directory free to use.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Third-Party Links</h2>
          <p className="text-gray-500 mb-6">Our website contains hundreds of links to external AI tools. We do not control these external websites and are not responsible for their privacy practices. Please read their privacy policies when visiting them.</p>

          <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Contact Us</h2>
          <p className="text-gray-500">If you have questions about this privacy policy, please contact us through our Contact Page.</p>
        </div>
      </div>
    </>
  );
}