import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import React from 'react';
import Layout from '@lekoarts/gatsby-theme-minimal-blog/src/components/layout';
import Seo from '../@lekoarts/gatsby-theme-minimal-blog/components/seo';
// ...

import { Text } from 'theme-ui';

const HeroTextComponent = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Text sx={{ fontSize: [3], fontWeight: `bold`, color: `heading` }}>
        {t('hero.greeting')}
      </Text>
      <p>{t('hero.description')}</p>
    </div>
  );
};

export default HeroTextComponent;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["index"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;