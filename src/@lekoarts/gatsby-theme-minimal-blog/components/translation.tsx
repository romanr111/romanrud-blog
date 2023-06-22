import React, { ElementType, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, Theme } from 'theme-ui';

type TranslationProps = {
  id: string;
  ns: string | string[];
  className?: string;
  altTextId?: string;
  tag?: ElementType;
  wrapperTag?: ElementType;
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
  children?: ReactNode;
};

const pTagStyles = { mt: '20px', mb: '20px' };

const Translation = ({
  id,
  ns,
  tag,
  wrapperTag,
  altTextId,
  wrapperProps,
  children,
  ...props
}: TranslationProps) => {
  const { t } = useTranslation(ns);
  const isPtag = tag === 'p';

  const styles = (t: Theme) => {
    return { ...(isPtag ? pTagStyles : {}), ...t?.styles?.[`${tag}`] };
  };

  const content = tag ? (
    <Text as={tag} sx={styles} {...props}>
      {t(id)}
      {children}
    </Text>
  ) : (
    <React.Fragment>
      {t(id)} {children}
    </React.Fragment>
  );

  if (wrapperTag) {
    const isWrapperPTag = wrapperTag == 'p';
    const wrapperStyles = (t: Theme) => {
      return {
        ...(isWrapperPTag ? pTagStyles : {}),
        ...t?.styles?.[`${wrapperTag}`],
      };
    };
    return (
      <Text as={wrapperTag} sx={wrapperStyles} {...wrapperProps}>
        {content}
        {children}
      </Text>
    );
  }

  if (tag === 'img') {
    const imagePath = t(id);
    const altText = altTextId && t(altTextId);
    return <img src={imagePath} alt={altText} {...props} />;
  }

  return content;
};

export default Translation;
