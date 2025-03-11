import * as React from 'react';
import { useEffect } from 'react';
import { navigate } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';

const Redirect: React.FC<{ to: string }> = ({ to }) => {
  const { language, languages, originalPath } = useI18next();

  useEffect(() => {
    const detectLanguage = () => {
      // Get the browser's language
      const browserLanguages = window.navigator.languages || [window.navigator.language];
      
      // Check if any of the browser's languages match our supported languages
      for (const lang of browserLanguages) {
        const shortLang = lang.split('-')[0];
        
        // Special case for Ukrainian IPs/browsers
        if (shortLang === 'uk' || shortLang === 'ru') {
          return 'uk';  // Prioritize Ukrainian for users with Ukrainian or Russian browser settings
        }
        
        if (languages.includes(shortLang)) {
          return shortLang;
        }
      }
      
      return 'en';  // Default to English if no match found
    };
    
    const detectedLanguage = detectLanguage();
    
    // Only redirect if we're not already on the detected language path
    if (detectedLanguage !== language) {
      const targetPath = detectedLanguage === 'en' 
        ? to 
        : `/${detectedLanguage}${to}`;
      
      navigate(targetPath, { replace: true });
    }
  }, [to, language, languages, originalPath]);

  return null;
};

export default Redirect; 