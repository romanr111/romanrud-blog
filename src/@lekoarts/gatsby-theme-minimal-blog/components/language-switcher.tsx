/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';
import { useI18next } from 'gatsby-plugin-react-i18next';

const LanguageSwitcher = () => {
  const { languages, originalPath, language } = useI18next();

  return (
    <div
      sx={{
        display: 'flex',
        gap: 2,
        fontSize: [1, `18px`],
        a: {
          color: 'secondary',
          textDecoration: 'none',
          '&:hover': {
            color: 'heading',
          },
          '&.active': {
            color: 'heading',
            fontWeight: 'bold',
          },
        },
      }}
    >
      {languages.map((lng) => (
        <Link
          key={lng}
          to={lng === 'en' ? originalPath : `/${lng}${originalPath}`}
          className={lng === language ? 'active' : ''}
        >
          {lng.toUpperCase()}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSwitcher; 