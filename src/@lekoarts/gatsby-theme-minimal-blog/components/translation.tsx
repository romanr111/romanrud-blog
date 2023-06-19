import React, { ElementType } from 'react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { Text, Theme } from 'theme-ui';

type TranslationProps = {
  id: string;
  ns: string | string[];
  tag?: ElementType;
  children?: React.ReactNode;
};

const pTagStyles = { mt: '20px', mb: '20px' };

const Translation = ({
  id,
  ns,
  tag,
  ...props
}: TranslationProps) => {
  const { t } = useTranslation(ns);
  const isPtag = tag === 'p';

  const styles = (t: Theme) => {
    return { ...(isPtag ? pTagStyles : {}), ...t?.styles?.[`${tag}`] };
  };

  const content = tag ? (
    <Text as={tag} sx={styles} {...props}>
      <ReactMarkdown>{t(id)}</ReactMarkdown>
    </Text>
  ) : (
    <ReactMarkdown>{t(id)}</ReactMarkdown>
  );

  return content;
};

export default Translation;
