import React from 'react';
import { Text } from 'theme-ui';
import { useTranslation } from 'gatsby-plugin-react-i18next';

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
