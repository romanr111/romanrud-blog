import React from 'react';
import { Helmet } from 'react-helmet';

interface GoogleAnalyticsProps {
  measurementId: string;
  children?: React.ReactNode;
}

/**
 * GoogleAnalytics component that injects Google Analytics tracking script into the head
 * This component follows OOP principles by encapsulating the analytics functionality
 */
const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({ measurementId, children }) => {
  if (!measurementId) {
    console.warn('Google Analytics Measurement ID is not provided');
    return <>{children}</>;
  }

  return (
    <>
      <Helmet>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          `}
        </script>
      </Helmet>
      {children}
    </>
  );
};

export default GoogleAnalytics; 