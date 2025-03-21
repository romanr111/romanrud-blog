import React from 'react';
import usePageTracking from './usePageTracking';

/**
 * PageTracker component that uses the usePageTracking hook to track page views
 * Returns null because it doesn't render anything visible
 */
const PageTracker: React.FC = () => {
  // Use the page tracking hook
  usePageTracking();
  
  // This component doesn't render anything
  return null;
};

export default PageTracker; 