import React from 'react';
import { AnalyticsProvider } from './AnalyticsContext';
import GoogleAnalytics from './GoogleAnalytics';

interface AnalyticsWrapperProps {
  children: React.ReactNode;
}

/**
 * AnalyticsWrapper component that combines the AnalyticsProvider with the GoogleAnalytics script
 * This component follows OOP principles by separating concerns and providing a clean interface
 */
const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({ children }) => {
  // Google Analytics measurement ID
  const measurementId = 'G-T97E08CTLH';
  
  return (
    <AnalyticsProvider
      config={{
        googleAnalyticsId: measurementId,
        enabled: process.env.NODE_ENV === 'production',
      }}
    >
      <GoogleAnalytics measurementId={measurementId}>
        {children}
      </GoogleAnalytics>
    </AnalyticsProvider>
  );
};

export default AnalyticsWrapper; 