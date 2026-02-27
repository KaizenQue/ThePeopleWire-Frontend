// app/privacy-policy/page.tsx
"use client";

import { useState, useEffect } from "react";
import LoadingGif from "@/components/LoadingGif";

export default function PrivacyPolicyPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingGif />;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">
              Privacy Policy
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
          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              1. Introduction
            </h2>
            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>Welcome to The People Wire ("Platform", "we", "our", "us").</p>
              <p>The People Wire is a global digital news aggregation platform owned and operated by:</p>
              <div className="bg-gray-50 p-4 font-mono text-sm text-gray-800">
                STAR1IT CARAVAN PRIVATE LIMITED<br />
                K-201, Purva Panorama<br />
                Kalena Agrahara, Bannerghatta Road<br />
                Bangalore, Bangalore South<br />
                Karnataka, India - 560076<br />
                Email: info@thepeoplewire.com
              </div>
              <p>This Privacy Policy explains how we collect, use, process, disclose, and safeguard your information when you use:</p>
             <ul className="list-disc pl-6 space-y-1">
  <li>
    <a 
      href="https://www.thepeoplewire.com" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      www.thepeoplewire.com
    </a>
  </li>
  <li>The People Wire mobile application (when launched)</li>
  <li>Any related digital services</li>
</ul>
              <p className="font-medium">By accessing or using the Platform, you agree to this Privacy Policy.</p>
            </div>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              2. Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">A. Information You Provide</h3>
                <p className="text-gray-700 mb-2">We may collect:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Account registration details (if enabled)</li>
                  <li>Newsletter preferences</li>
                  <li>Feedback and support inquiries</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">B. Automatically Collected Information</h3>
                <p className="text-gray-700 mb-2">When you access the Platform, we may collect:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>IP address</li>
                  <li>Device type and operating system</li>
                  <li>Browser type</li>
                  <li>Approximate geographic location</li>
                  <li>Pages viewed</li>
                  <li>Session duration</li>
                  <li>Click activity</li>
                  <li>Referring URLs</li>
                  <li>Cookies and analytics data</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-2">We use collected information to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Operate and improve the Platform</li>
              <li>Personalize content feeds</li>
              <li>Analyze traffic and engagement</li>
              <li>Improve user experience</li>
              <li>Send marketing communications (if opted-in)</li>
              <li>Maintain security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="text-gray-700 font-medium">We do not sell personal data.</p>
          </section>

          {/* Marketing Communications */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              4. Marketing Communications
            </h2>
            <p className="text-gray-700 mb-2">The People Wire may send marketing and promotional communications, including:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Newsletters</li>
              <li>Breaking news alerts</li>
              <li>Feature updates</li>
              <li>Promotional campaigns</li>
              <li>Sponsored or partner notifications</li>
              <li>Event invitations</li>
              <li>Surveys</li>
            </ul>
            <p className="text-gray-700 mb-2">Communications may be delivered via:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Email</li>
              <li>Push notifications</li>
              <li>In-platform alerts</li>
              <li>SMS (if introduced later)</li>
            </ul>
            
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-2">Consent</h3>
                <p className="text-gray-700">Where required by law, we will obtain your consent before sending marketing communications.</p>
              </div>
              
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-2">Opt-Out</h3>
                <p className="text-gray-700 mb-2">You may opt out at any time by:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Clicking the unsubscribe link in emails</li>
                  <li>Adjusting notification settings</li>
                  <li>Disabling push notifications</li>
                  <li>Contacting info@thepeoplewire.com</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Legal Basis for Processing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              5. Legal Basis for Processing (GDPR Compliance)
            </h2>
            <p className="text-gray-700 mb-2">For users in the European Economic Area, we process data based on:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Consent</li>
              <li>Legitimate interests</li>
              <li>Contractual necessity</li>
              <li>Legal obligations</li>
            </ul>
          </section>

          {/* Cookies and Tracking */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              6. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-2">We use cookies for:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Essential functionality</li>
              <li>Analytics</li>
              <li>Performance monitoring</li>
              <li>Advertising (if implemented)</li>
            </ul>
            <p className="text-gray-700">Users may control cookies via browser settings.</p>
          </section>

          {/* Data Sharing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              7. Data Sharing
            </h2>
            <p className="text-gray-700 mb-2">We may share information with:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Hosting providers</li>
              <li>Cloud service providers</li>
              <li>Analytics partners</li>
              <li>Advertising partners (if applicable)</li>
              <li>Regulatory authorities when legally required</li>
            </ul>
            <p className="text-gray-700 font-medium">We do not sell personal data to third parties for independent marketing purposes.</p>
          </section>

          {/* International Data Transfers */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              8. International Data Transfers
            </h2>
            <p className="text-gray-700 mb-2">As a platform operated from India and accessible globally, your information may be processed in India or other countries where our service providers operate.</p>
            <p className="text-gray-700">By using the Platform, you consent to such transfers.</p>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              9. Data Retention
            </h2>
            <p className="text-gray-700 mb-2">We retain personal data only as long as necessary to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>Provide services</li>
              <li>Comply with legal requirements</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              10. Your Rights
            </h2>
            <p className="text-gray-700 mb-2">Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mb-4">
              <li>Access your data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Withdraw consent</li>
              <li>Opt out of marketing communications</li>
            </ul>
            <p className="text-gray-700">To exercise your rights, contact info@thepeoplewire.com</p>
          </section>

          {/* Third-Party Links */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              11. Third-Party Links
            </h2>
            <p className="text-gray-700 mb-2">The People Wire aggregates publicly available news content and links to third-party publishers.</p>
            <p className="text-gray-700">We are not responsible for the privacy practices or content of external websites.</p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              12. Children's Privacy
            </h2>
            <p className="text-gray-700">The Platform is not intended for individuals under 13 years of age (or the applicable minimum age in your jurisdiction).</p>
          </section>

          {/* Security */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              13. Security
            </h2>
            <p className="text-gray-700">We implement reasonable security measures to protect personal data. However, no digital transmission is completely secure.</p>
          </section>

          {/* Policy Updates */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              14. Policy Updates
            </h2>
            <p className="text-gray-700">We may update this Privacy Policy at any time. Changes will be reflected with a revised "Last Updated" date.</p>
          </section>

          {/* Contact Information */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-1 border-b border-gray-200">
              15. Contact Information
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