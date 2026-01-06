"use client";

import React, { useEffect, useRef, useState } from "react";

interface MidAdProps {
  adUnitId?: string;
  className?: string;
  showFallback?: boolean;
  fallbackContent?: React.ReactNode;
  containerPadding?: string;
  backgroundColor?: string;
  centered?: boolean;
}

const MidAd: React.FC<MidAdProps> = ({
  adUnitId = "mid_ad_unit",
  className = "",
  showFallback = true,
  fallbackContent,
  containerPadding = "0",
  backgroundColor = "transparent",
  centered = true,
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  /* ---------------- Simulate Ad Load ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      const shouldLoad = Math.random() > 0.2;
      setAdLoaded(shouldLoad);
      setAdError(!shouldLoad);
    }, 800);

    return () => clearTimeout(timer);
  }, [adUnitId]);

  /* ---------------- Fallback ---------------- */
  const defaultFallback = (
    <div className="fallback">
      <strong>Advertisement</strong>
      <div>1170 × 257</div>
    </div>
  );

  /* ---------------- IMAGE AD CONTENT ---------------- */
  const adContent = (
    <div className="mid-ad-inner">
      <a
        href="https://legalcaseinfo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mid-ad-link"
      >
        <img
          src="/firstad.png"
          alt="Advertisement"
          className="mid-ad-img"
          loading="lazy"
        />
      </a>
    </div>
  );

  /* ---------------- Loading ---------------- */
  const loadingContent = (
    <div className="loading">
      <span />
      <p>Loading Advertisement…</p>
    </div>
  );

  const renderContent = () => {
    if (!adLoaded && !adError) return loadingContent;
    if (adError && showFallback) return fallbackContent || defaultFallback;
    return adContent;
  };

  return (
    <div
      ref={adContainerRef}
      className={`mid-ad-container ${className}`}
      style={{
        backgroundColor,
        padding: containerPadding,
        display: "flex",
        justifyContent: centered ? "center" : "flex-start",
        margin: "32px 0",
      }}
      data-ad-unit={adUnitId}
    >
      {/* Fixed desktop wrapper */}
      <div className="mid-ad-wrapper">
    
        {renderContent()}
      </div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        .mid-ad-wrapper {
          width: 1170px;
          height: 257px;
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
        }

        .ad-label {
          position: absolute;
          top: 12px;
          left: 16px;
          font-size: 12px;
          background: rgba(255, 255, 255, 0.9);
          padding: 4px 10px;
          border-radius: 4px;
          z-index: 10;
          border: 1px solid #ddd;
        }

        /* ---------- DESKTOP ---------- */
        .mid-ad-inner {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          padding: 98px 0 98px 50px;
          box-sizing: border-box;
        }

        .mid-ad-link {
          display: block;
          cursor: pointer;
        }

        .mid-ad-img {
          max-width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
        }

        /* ---------- LOADING ---------- */
        .loading {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
        }

        .loading span {
          width: 40px;
          height: 40px;
          border: 4px solid #ddd;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 12px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ---------- TABLET ---------- */
        @media (max-width: 1024px) {
          .mid-ad-wrapper {
            width: 100%;
            height: auto;
          }

          .mid-ad-inner {
            padding: 0 24px; /* ✅ left & right padding only */
            justify-content: center;
          }

          .mid-ad-img {
            width: 100%;
            height: auto;
          }
        }

        /* ---------- MOBILE ---------- */
        @media (max-width: 768px) {
          .mid-ad-container {
            margin: 20px 0;
          }

          .mid-ad-wrapper {
            width: 100%;
            height: auto;
          }

          .mid-ad-inner {
            padding: 0 16px; /* ✅ left & right padding */
            justify-content: center;
          }

          .mid-ad-img {
            width: 100%;
            height: auto;
          }
        }

        /* ---------- SMALL MOBILE ---------- */
        @media (max-width: 480px) {
          .mid-ad-inner {
            padding: 0 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default MidAd;