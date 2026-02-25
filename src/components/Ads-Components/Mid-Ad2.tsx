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

  /* ---------------- IMAGE AD ---------------- */
  const adContent = (
    <div className="mid-ad-inner">
      <a
        href="https://connect2attorney.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="mid-ad-link"
      >
        <img
          src="/secondadd.png"
          alt="Advertisement"
          className="mid-ad-img"
          loading="lazy"
        />
      </a>
    </div>
  );

  const renderContent = () => {
    if (!adLoaded && !adError)
      return (
        <div className="loading">
          <span />
          <p>Loading Advertisement…</p>
        </div>
      );

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
      <div className="mid-ad-wrapper">{renderContent()}</div>

      {/* ================= STYLES ================= */}
      <style jsx>{`
        /* ===== MAX SIZE LOCK ===== */
        .mid-ad-wrapper {
          max-width: 1170px;
          width: 100%;
          aspect-ratio: 1170 / 257;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
        }

        /* ===== DESKTOP (MAX STATE) ===== */
        .mid-ad-inner {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          padding: 98px 0 98px 50px;
          gap: 10px;
          box-sizing: border-box;
        }

        .mid-ad-link {
          display: block;
          width: 100%;
        }

        .mid-ad-img {
          width: 100%;
          height: auto;
          max-height: 100%;
          object-fit: contain;
          display: block;
        }

        /* ===== LOADING ===== */
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
          width: 36px;
          height: 36px;
          border: 4px solid #ddd;
          border-top-color: #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 10px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ===== TABLET ===== */
        @media (max-width: 1024px) {
          .mid-ad-inner {
            padding: 0 24px; /* left/right only */
            justify-content: center;
          }
        }

        /* ===== MOBILE ===== */
        @media (max-width: 768px) {
          .mid-ad-container {
            margin: 20px 0;
          }

          .mid-ad-inner {
            padding: 0 16px;
            justify-content: center;
          }
        }

        /* ===== SMALL MOBILE ===== */
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
