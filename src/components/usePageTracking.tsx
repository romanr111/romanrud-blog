import { useEffect } from 'react';
import { useLocation } from '@reach/router';
import { useAnalytics } from './AnalyticsContext';

/**
 * Hook to track page views as the user navigates through the site
 * Uses the AnalyticsContext to track page views in Google Analytics
 */
const usePageTracking = (): void => {
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // When the location changes, track the page view
    if (location) {
      trackPageView(location.pathname);
    }
  }, [location, trackPageView]);
};

export default usePageTracking; 