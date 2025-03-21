import React, { createContext, useContext, ReactNode } from 'react';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// Interface for the analytics configuration
interface AnalyticsConfig {
  googleAnalyticsId: string;
  enabled: boolean;
}

// Context interface with configuration and methods
interface AnalyticsContextType {
  config: AnalyticsConfig;
  trackEvent: (eventName: string, eventParams?: Record<string, any>) => void;
  trackPageView: (path: string) => void;
}

// Default configuration
const defaultConfig: AnalyticsConfig = {
  googleAnalyticsId: 'G-T97E08CTLH', // The ID provided by the user
  enabled: true,
};

// Create the context with default values
const AnalyticsContext = createContext<AnalyticsContextType>({
  config: defaultConfig,
  trackEvent: () => {},
  trackPageView: () => {},
});

// Props for the provider component
interface AnalyticsProviderProps {
  children: ReactNode;
  config?: Partial<AnalyticsConfig>;
}

/**
 * AnalyticsProvider component that provides analytics configuration and methods
 * throughout the application using React Context API
 */
export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ 
  children, 
  config = {}
}) => {
  // Merge the default config with any provided config
  const mergedConfig: AnalyticsConfig = {
    ...defaultConfig,
    ...config,
  };

  // Method to track custom events
  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    if (mergedConfig.enabled && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  };

  // Method to track page views
  const trackPageView = (path: string) => {
    if (mergedConfig.enabled && typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', mergedConfig.googleAnalyticsId, {
        page_path: path,
      });
    }
  };

  // Provide the context value to children
  return (
    <AnalyticsContext.Provider
      value={{
        config: mergedConfig,
        trackEvent,
        trackPageView,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

// Custom hook to use the analytics context
export const useAnalytics = () => useContext(AnalyticsContext);

export default AnalyticsContext; 