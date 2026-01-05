"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface HeaderADProps {
  className?: string;
  tileSpacing?: number;
  centered?: boolean;
  leftAdUrl?: string;
  rightAdUrl?: string;
  leftAdImage?: string;
  rightAdImage?: string;
  leftAdAlt?: string;
  rightAdAlt?: string;
}

const HeaderAD: React.FC<HeaderADProps> = ({
  className = "",
  tileSpacing = 8,
  centered = true,
  leftAdUrl = "https://connect2attorney.com/contact/",
  rightAdUrl = "https://connect2attorney.com/contact/",
  leftAdImage = "/hero-leftad.png",
  rightAdImage = "/hero-rightad.png",
  leftAdAlt = "Advertisement - Left",
  rightAdAlt = "Advertisement - Right",
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [leftImageError, setLeftImageError] = useState(false);
  const [rightImageError, setRightImageError] = useState(false);

  const handleAdClick = (url: string, type: "left" | "right") => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      ref={adContainerRef}
      className={`header-ad-container ${className}`}
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: centered ? "16px auto" : "16px 0",
        padding: "0 16px",
      }}
    >
      {/* ROW WITH FIXED ASPECT RATIO */}
      <div
        className="ad-row"
        style={{
          display: "flex",
          gap: `${tileSpacing}px`,
          width: "100%",
          aspectRatio: "1140 / 217", // 240 + 900 = 1140
        }}
      >
        {/* LEFT AD */}
        <div
          onClick={() => handleAdClick(leftAdUrl, "left")}
          title={leftAdAlt}
          style={{
            flex: "0 0 20%",
            position: "relative",
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: "6px",
            backgroundColor: "#fff",
          }}
        >
          {!leftImageError ? (
            <Image
              src={leftAdImage}
              alt={leftAdAlt}
              fill
              style={{objectFit: "cover" }}
              sizes="(max-width: 480px) 20vw, (max-width: 768px) 25vw, 240px"
              onError={() => setLeftImageError(true)}
            />
          ) : (
            <div className="fallback left">{leftAdAlt}</div>
          )}
          <div className="hover-overlay" />
        </div>

        {/* RIGHT AD */}
        <div
          onClick={() => handleAdClick(rightAdUrl, "right")}
          title={rightAdAlt}
          style={{
            flex: "1",
            position: "relative",
            cursor: "pointer",
            overflow: "hidden",
            borderRadius: "6px",
            backgroundColor: "#fff",
          }}
        >
          {!rightImageError ? (
            <Image
              src={rightAdImage}
              alt={rightAdAlt}
              fill
              style={{objectFit: "cover" }}
              sizes="(max-width: 480px) 75vw, (max-width: 768px) 70vw, 900px"
              onError={() => setRightImageError(true)}
            />
          ) : (
            <div className="fallback right">{rightAdAlt}</div>
          )}
          <div className="hover-overlay" />
        </div>
      </div>

      {/* STYLES */}
      <style jsx>{`
        .ad-row > div {
          height: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .ad-row > div:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.05);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }

        .ad-row > div:hover .hover-overlay {
          opacity: 1;
        }

        .fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: 600;
          text-align: center;
          padding: 16px;
        }

        .fallback.left {
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          font-size: 14px;
        }

        .fallback.right {
          background: linear-gradient(135deg, #667eea, #764ba2);
          font-size: 18px;
        }

        /* MOBILE */
        @media (max-width: 767px) {
          .header-ad-container {
            padding: 0 12px;
          }

          .ad-row > div:first-child {
            flex: 0 0 22%;
          }
        }

        @media (max-width: 480px) {
          .header-ad-container {
            padding: 0 8px;
          }

          .ad-row > div:first-child {
            flex: 0 0 20%;
          }
        }

        @media (min-width: 1600px) {
          .header-ad-container {
            max-width: 1280px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderAD;
