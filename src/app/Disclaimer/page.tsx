// app/disclaimer/page.tsx
export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">
              Disclaimer
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              Last Updated: 25 February 2026
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="prose prose-gray max-w-none">
          {/* Nature of Service */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              1. Nature of Service
            </h2>
            <p className="text-gray-700 mb-3">The People Wire is a news aggregation platform that curates publicly available headlines, summaries, and links to third-party publishers.</p>
            <p className="text-gray-700">We do not claim ownership of third-party content. All trademarks and intellectual property belong to their respective owners.</p>
          </section>

          {/* Fair Use */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              2. Fair Use
            </h2>
            <p className="text-gray-700 mb-2">The Platform may display:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Article titles</li>
              <li>Short excerpts</li>
              <li>Thumbnails</li>
            </ul>
            <p className="text-gray-700">Full copyrighted articles are not reproduced without authorization.</p>
          </section>

          {/* No Editorial Endorsement */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              3. No Editorial Endorsement
            </h2>
            <p className="text-gray-700 mb-2">We do not guarantee the accuracy of third-party content or endorse the views expressed in aggregated articles.</p>
            <p className="text-gray-700">Users should verify information directly from original publishers.</p>
          </section>

          {/* No Professional Advice */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              4. No Professional Advice
            </h2>
            <p className="text-gray-700">Content provided on The People Wire is for informational purposes only and does not constitute legal, financial, medical, or professional advice.</p>
          </section>

          {/* Copyright Complaints */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              5. Copyright Complaints
            </h2>
            <p className="text-gray-700 mb-3">If you believe your copyrighted material has been improperly used, please contact:</p>
            <div className="bg-gray-50 p-3 font-mono text-sm text-gray-800 mb-3">
              info@thepeoplewire.com
            </div>
            <p className="text-gray-700">Include proof of ownership and the URL in question.</p>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-3">STAR1IT CARAVAN PRIVATE LIMITED shall not be liable for errors, omissions, reliance on aggregated content, technical interruptions, or damages arising from third-party websites.</p>
            <p className="text-gray-700 font-medium">Use of the Platform is at your own risk.</p>
          </section>

          {/* Contact Information */}
          <section className="mt-12 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="bg-gray-50 p-4 font-mono text-sm text-gray-800">
              STAR1IT CARAVAN PRIVATE LIMITED<br />
              K-201, Purva Panorama<br />
              Kalena Agrahara, Bannerghatta Road<br />
              Bangalore, Bangalore South<br />
              Karnataka, India - 560076<br />
              Email: info@thepeoplewire.com
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}