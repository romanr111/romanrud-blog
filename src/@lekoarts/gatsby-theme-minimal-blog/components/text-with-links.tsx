import React, { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Theme } from 'theme-ui';

type TextWithLinksProps = {
  id: string;
  ns: string | string[];
  tag?: ElementType;
  className?: string;
};

const pTagStyles = { mt: '20px', mb: '20px' };

const TextWithLinks = ({ id, tag = 'p', ns, className }: TextWithLinksProps) => {
  const { t } = useTranslation(ns);
  const text = t(id);
  
  // Check if the text contains any HTML links
  if (!text.includes('<a href')) {
    // If no links, render normally
    const isPtag = tag === 'p';
    const styles = (theme: Theme) => {
      return { ...(isPtag ? pTagStyles : {}), ...theme?.styles?.[`${tag}`] };
    };
    
    return (
      <Text as={tag} sx={styles} className={className}>
        {text}
      </Text>
    );
  }
  
  // Split the text by HTML tags to separate links from regular text
  const parts = text.split(/(<a href.*?<\/a>)/);
  
  // Use the same styling as the Translation component
  const isPtag = tag === 'p';
  const styles = (theme: Theme) => {
    return { ...(isPtag ? pTagStyles : {}), ...theme?.styles?.[`${tag}`] };
  };
  
  return (
    <Text as={tag} sx={styles} className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('<a href')) {
          // For link parts, return a span with dangerouslySetInnerHTML
          return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        } else {
          // For text parts, return the text as is
          return <React.Fragment key={index}>{part}</React.Fragment>;
        }
      })}
    </Text>
  );
};

export default TextWithLinks; 