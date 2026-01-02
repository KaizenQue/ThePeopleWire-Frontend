"use client";

import React, { useEffect, useRef } from 'react';

interface HeaderADProps {
  /**
   * Ad unit ID for the left advertisement
   */
  leftAdUnitId?: string;
  /**
   * Ad unit ID for the right advertisement
   */
  rightAdUnitId?: string;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Whether to show a fallback when no ad is loaded
   */
  showFallback?: boolean;
  /**
   * Fallback content when left ad fails to load
   */
  leftFallbackContent?: React.ReactNode;
  /**
   * Fallback content when right ad fails to load
   */
  rightFallbackContent?: React.ReactNode;
  /**
   * Spacing between tiles in pixels (default: 8)
   */
  tileSpacing?: number;
  /**
   * Whether the ad container is centered (default: true)
   */
  centered?: boolean;
}

const HeaderAD: React.FC<HeaderADProps> = ({
  leftAdUnitId = 'header_ad_unit_left',
  rightAdUnitId = 'header_ad_unit_right',
  className = '',
  showFallback = true,
  leftFallbackContent,
  rightFallbackContent,
  tileSpacing = 8,
  centered = true
}) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [leftAdLoaded, setLeftAdLoaded] = React.useState(false);
  const [rightAdLoaded, setRightAdLoaded] = React.useState(false);
  const [leftAdError, setLeftAdError] = React.useState(false);
  const [rightAdError, setRightAdError] = React.useState(false);

  // Simulate ad loading for both tiles
  useEffect(() => {
    const timer1 = setTimeout(() => {
      const shouldLoadLeft = Math.random() > 0.2;
      setLeftAdLoaded(shouldLoadLeft);
      setLeftAdError(!shouldLoadLeft);
    }, 800);

    const timer2 = setTimeout(() => {
      const shouldLoadRight = Math.random() > 0.2;
      setRightAdLoaded(shouldLoadRight);
      setRightAdError(!shouldLoadRight);
    }, 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [leftAdUnitId, rightAdUnitId]);

  // Default fallback content for left tile (240×180)
  const defaultLeftFallback = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#f8f9fa',
      border: '2px dashed #dee2e6',
      borderRadius: '6px',
      padding: '12px',
      textAlign: 'center',
      color: '#6c757d'
    }}>
      <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>
        Ad
      </div>
      <div style={{ fontSize: '10px', marginBottom: '4px' }}>
        240px × 180px
      </div>
      <div style={{ fontSize: '9px', opacity: 0.7, marginBottom: '2px' }}>
        Left Tile
      </div>
      <div style={{ fontSize: '8px', opacity: 0.5 }}>
        {leftAdUnitId}
      </div>
    </div>
  );

  // Default fallback content for right tile (900×180)
  const defaultRightFallback = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: '#f8f9fa',
      border: '2px dashed #dee2e6',
      borderRadius: '6px',
      padding: '16px',
      textAlign: 'center',
      color: '#6c757d'
    }}>
      <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>
        Advertisement
      </div>
      <div style={{ fontSize: '12px', marginBottom: '4px' }}>
        900px × 180px
      </div>
      <div style={{ fontSize: '11px', opacity: 0.7, marginBottom: '2px' }}>
        Right Tile
      </div>
      <div style={{ fontSize: '10px', opacity: 0.5 }}>
        {rightAdUnitId}
      </div>
      <div style={{ fontSize: '9px', marginTop: '8px', opacity: 0.4 }}>
        Main ad space
      </div>
    </div>
  );

  // Ad content for left tile (240×180)
  const leftAdContent = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Left ad background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        opacity: 0.9
      }} />
      
      {/* Left ad content */}
      
    </div>
  );

  // Ad content for right tile (900×180)
  const rightAdContent = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      border: '1px solid #e0e0e0',
      borderRadius: '6px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Right ad background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        opacity: 0.9
      }} />
      
 
      
      {/* Center content section (main message) */}
      <div style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 1,
        color: '#ffffff'
      }}>
  
 
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
     
      
        </div>
      </div>
      
      {/* Right content section (CTA) */}
      <div style={{
        flex: '0 0 150px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        position: 'relative',
        zIndex: 1
      }}>
     
      </div>
      
      {/* Success indicator */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '20px',
        fontSize: '10px',
        color: 'rgba(255,255,255,0.8)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '3px 8px',
        borderRadius: '3px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <span>✓</span>
        <span>Loaded</span>
      </div>
    </div>
  );

  // Loading state for left tile
  const leftLoadingContent = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '30px',
          height: '30px',
          border: '3px solid #e0e0e0',
          borderTop: '3px solid #4facfe',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 8px'
        }} />
        <div style={{ fontSize: '10px', color: '#7f8c8d' }}>
          Loading...
        </div>
      </div>
    </div>
  );

  // Loading state for right tile
  const rightLoadingContent = (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e0e0e0',
          borderTop: '3px solid #667eea',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 12px'
        }} />
        <div style={{ fontSize: '12px', color: '#7f8c8d' }}>
          Loading main ad...
        </div>
      </div>
    </div>
  );

  // Determine what to render for left tile
  const renderLeftContent = () => {
    if (!leftAdLoaded && !leftAdError) {
      return leftLoadingContent;
    }
    
    if (leftAdError && showFallback) {
      return leftFallbackContent || defaultLeftFallback;
    }
    
    return leftAdContent;
  };

  // Determine what to render for right tile
  const renderRightContent = () => {
    if (!rightAdLoaded && !rightAdError) {
      return rightLoadingContent;
    }
    
    if (rightAdError && showFallback) {
      return rightFallbackContent || defaultRightFallback;
    }
    
    return rightAdContent;
  };

  return (
    <div
      ref={adContainerRef}
      className={`header-ad-container ${className}`}
      style={{
        width: `calc(240px + 900px + ${tileSpacing}px)`,
        height: '180px',
        margin: centered ? '16px auto' : '16px 0',
        position: 'relative',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        display: 'flex',
        gap: `${tileSpacing}px`
      }}
      data-testid="header-ad"
    >
      {/* Left ad tile (240×180) */}
      <div 
        style={{
          width: '240px',
          height: '180px',
          position: 'relative'
        }}
      >
        {/* Ad label for left tile */}
        <div style={{
          position: 'absolute',
          top: '6px',
          right: '6px',
          fontSize: '9px',
          color: '#95a5a6',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '2px 5px',
          borderRadius: '2px',
          border: '1px solid #eee'
        }}>
          Ad
        </div>

        {/* Left tile content */}
        {renderLeftContent()}

        {/* Error message for left tile */}
        {leftAdError && (
          <div style={{
            position: 'absolute',
            bottom: '6px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '8px',
            color: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            padding: '2px 6px',
            borderRadius: '2px',
            zIndex: 10
          }}>
            Failed
          </div>
        )}
      </div>

      {/* Right ad tile (900×180) */}
      <div 
        style={{
          width: '900px',
          height: '180px',
          position: 'relative'
        }}
      >
        {/* Ad label for right tile */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '12px',
          fontSize: '11px',
          color: '#6c757d',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 10,
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '3px 10px',
          borderRadius: '3px',
          border: '1px solid #dee2e6',
          fontWeight: 500
        }}>
          Advertisement
        </div>

        {/* Right tile content */}
        {renderRightContent()}

        {/* Error message for right tile */}
        {rightAdError && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '20px',
            fontSize: '10px',
            color: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            padding: '4px 10px',
            borderRadius: '3px',
            zIndex: 10,
            border: '1px solid rgba(231, 76, 60, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>⚠</span>
            <span>Ad failed</span>
          </div>
        )}
      </div>

      {/* Inline styles for animations and responsive behavior */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .header-ad-container:hover {
          opacity: 0.98;
          transition: opacity 0.2s ease;
        }
        
        .header-ad-container > div:last-child > div:first-child > div:last-child:hover {
          background-color: #667eea;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
        
        /* Tablet styles */
        @media (max-width: 1200px) {
          .header-ad-container {
            width: 95% !important;
            max-width: 1140px;
            height: 150px !important;
          }
          
          .header-ad-container > div:first-child {
            width: 200px !important;
          }
          
          .header-ad-container > div:last-child {
            width: calc(100% - 200px - ${tileSpacing}px) !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:first-child {
            flex: 0 0 180px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:nth-child(2) {
            padding: 15px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:last-child {
            flex: 0 0 130px !important;
          }
        }
        
        /* Medium tablets */
        @media (max-width: 992px) {
          .header-ad-container {
            width: 100% !important;
            max-width: 100%;
            height: auto !important;
            flex-direction: column;
            padding: 0 16px;
          }
          
          .header-ad-container > div:first-child,
          .header-ad-container > div:last-child {
            width: 100% !important;
            margin-bottom: ${tileSpacing}px;
          }
          
          .header-ad-container > div:first-child {
            height: 120px !important;
          }
          
          .header-ad-container > div:last-child {
            height: 140px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:first-child {
            flex: 0 0 120px !important;
            padding: 10px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:nth-child(2) {
            padding: 12px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:last-child {
            flex: 0 0 100px !important;
            padding: 10px !important;
          }
        }
        
        /* Mobile styles */
        @media (max-width: 768px) {
          .header-ad-container {
            padding: 0 12px;
          }
          
          .header-ad-container > div:first-child {
            height: 100px !important;
          }
          
          .header-ad-container > div:last-child {
            height: 120px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child {
            flex-wrap: wrap;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:first-child {
            flex: 0 0 100px !important;
            height: 100%;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:nth-child(2) {
            flex: 1;
            min-width: 200px;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:last-child {
            position: absolute;
            bottom: 10px;
            right: 10px;
            flex: 0 0 auto;
            padding: 6px 12px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:first-child > div {
            width: 80px !important;
            height: 80px !important;
          }
        }
        
        /* Extra small mobile */
        @media (max-width: 480px) {
          .header-ad-container > div:first-child {
            height: 80px !important;
          }
          
          .header-ad-container > div:last-child {
            height: 100px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:first-child {
            flex: 0 0 80px !important;
            padding: 8px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:nth-child(2) {
            padding: 8px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:first-child > div {
            width: 60px !important;
            height: 60px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:nth-child(2) > div:first-child {
            font-size: 16px !important;
          }
          
          .header-ad-container > div:last-child > div:first-child > div:nth-child(2) > div:nth-child(2) {
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HeaderAD;