"use client";

import React, { useEffect, useRef } from 'react';

interface MidAdProps {
  /**
   * Ad unit ID for the advertisement
   */
  adUnitId?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show a fallback when no ad is loaded
   */
  showFallback?: boolean;
  /**
   * Fallback content when ad fails to load
   */
  fallbackContent?: React.ReactNode;
  /**
   * Container padding (default: 0)
   */
  containerPadding?: string;
  /**
   * Background color of the ad container
   */
  backgroundColor?: string;
  /**
   * Whether to center the ad (default: true)
   */
  centered?: boolean;
}

const MidAd: React.FC<MidAdProps> = ({
  adUnitId = 'mid_ad_unit',
  className = '',
  showFallback = true,
  fallbackContent,
  containerPadding = '0',
  backgroundColor = 'transparent',
  centered = true
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const [adError, setAdError] = React.useState(false);

  // Simulate ad loading
  useEffect(() => {
    const timer = setTimeout(() => {
      const shouldLoad = Math.random() > 0.2;
      
      if (shouldLoad) {
        setAdLoaded(true);
        setAdError(false);
      } else {
        setAdLoaded(false);
        setAdError(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [adUnitId]);

  // Default fallback content - 1170px × 257px size
  const defaultFallback = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#f8f9fa',
      border: '2px dashed #dee2e6',
      borderRadius: '8px',
      padding: '32px',
      textAlign: 'center',
      color: '#6c757d'
    }}>
      <div style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>
        Advertisement
      </div>
      <div style={{ fontSize: '16px', marginBottom: '8px', opacity: 0.8 }}>
        1170px × 257px
      </div>
      <div style={{ fontSize: '14px', opacity: 0.7, marginBottom: '12px' }}>
        Ad Unit: {adUnitId}
      </div>
      <div style={{ fontSize: '13px', marginTop: '16px', opacity: 0.5 }}>
        This ad space is optimized for 1170×257 dimensions
      </div>
    </div>
  );

  // Ad content - optimized for 1170×257
  const adContent = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Left side content (approx 60%) */}

      
      {/* Right side content (approx 40%) */}
     
      {/* Ad success indicator */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        right: '20px',
        fontSize: '12px',
        color: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        padding: '4px 12px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>✓</span>
        <span>Ad loaded successfully</span>
      </div>
    </div>
  );

  // Loading state - optimized for 1170×257
  const loadingContent = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Shimmer effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 2s infinite',
        borderRadius: '8px'
      }} />
      
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        textAlign: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          border: '4px solid #e0e0e0',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 20px'
        }} />
        <div style={{ 
          fontSize: '20px', 
          color: '#495057', 
          fontWeight: 600,
          marginBottom: '12px'
        }}>
          Loading Advertisement
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#6c757d',
          maxWidth: '400px'
        }}>
          Preparing your personalized ad experience...
        </div>
      </div>
    </div>
  );

  // Determine what to render
  const renderContent = () => {
    if (!adLoaded && !adError) {
      return loadingContent;
    }
    
    if (adError && showFallback) {
      return fallbackContent || defaultFallback;
    }
    
    return adContent;
  };

  return (
    <div
      ref={adContainerRef}
      className={`mid-ad-container ${className}`}
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: '32px 0',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        backgroundColor: backgroundColor,
        padding: containerPadding,
        display: 'flex',
        justifyContent: centered ? 'center' : 'flex-start'
      }}
      data-ad-unit={adUnitId}
      data-testid="mid-ad"
    >
      {/* Main container with fixed size */}
      <div style={{
        width: '1170px',
        height: '257px',
        position: 'relative',
        margin: centered ? '0 auto' : '0'
      }}>
        {/* Ad label */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '20px',
          fontSize: '12px',
          color: '#6c757d',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 20,
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '4px 12px',
          borderRadius: '4px',
          border: '1px solid #dee2e6',
          fontWeight: 500,
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          Advertisement
        </div>

        {/* Main content */}
        {renderContent()}

        {/* Error message (optional) */}
        {adError && (
          <div style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            fontSize: '12px',
            color: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            padding: '6px 14px',
            borderRadius: '4px',
            zIndex: 20,
            border: '1px solid rgba(231, 76, 60, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span>⚠</span>
            <span>Ad failed to load</span>
          </div>
        )}
      </div>

      {/* Inline styles for animations and responsive behavior */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .mid-ad-container {
          transition: all 0.3s ease;
        }
        
        .mid-ad-container:hover > div {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        /* Tablet styles - scale down */
        @media (max-width: 1200px) {
          .mid-ad-container > div {
            width: calc(1170px * 0.85);
            height: calc(257px * 0.85);
            transform: scale(0.85);
            transform-origin: center;
          }
          
          .mid-ad-container:hover > div {
            transform: scale(0.85) translateY(-2px);
          }
        }
        
        /* Smaller tablets */
        @media (max-width: 1024px) {
          .mid-ad-container > div {
            width: calc(1170px * 0.75);
            height: calc(257px * 0.75);
            transform: scale(0.75);
          }
          
          .mid-ad-container:hover > div {
            transform: scale(0.75) translateY(-2px);
          }
        }
        
        /* Mobile styles - stack layout */
        @media (max-width: 768px) {
          .mid-ad-container {
            margin: 24px 0;
            padding: 16px;
          }
          
          .mid-ad-container > div {
            width: 100%;
            height: auto;
            min-height: 300px;
            transform: none;
            max-width: 100%;
          }
          
          .mid-ad-container > div > div:first-child {
            flex-direction: column;
          }
          
          .mid-ad-container > div > div:first-child > div:first-child,
          .mid-ad-container > div > div:first-child > div:last-child {
            flex: 0 0 auto;
            width: 100%;
            height: 50%;
          }
          
          .mid-ad-container:hover > div {
            transform: translateY(-2px);
          }
        }
        
        /* Extra small mobile */
        @media (max-width: 480px) {
          .mid-ad-container {
            margin: 16px 0;
            padding: 12px;
          }
          
          .mid-ad-container > div {
            min-height: 250px;
          }
          
          .mid-ad-container > div > div:first-child > div:first-child {
            padding: 20px;
          }
          
          .mid-ad-container > div > div:first-child > div:last-child {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default MidAd;