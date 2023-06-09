import React from 'react';
import { useTranslation } from 'react-i18next';

type TranslateProps = {
  id: string;
};

const Translate: React.FC<TranslateProps> = ({ id }) => {
  const { t } = useTranslation();
  return <>{t(id)}</>;
};

export default Translate;
