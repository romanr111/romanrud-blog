/** @jsx jsx */
import * as React from "react";
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import replaceSlashes from "../utils/replaceSlashes";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

type NavigationProps = {
  nav: {
    title: string;
    slug: string;
  }[];
};

// Navigation bar, uses data from gatsby-config.ts, navigation array;
// Line 48 works only for the blog page /uk/blog/
const Navigation = ({ nav }: NavigationProps) => {
  const { t } = useTranslation();
  const { basePath: basePath_ } = useMinimalBlogConfig();
  const { language, i18n } = useI18next();
  const isDefaultLanguage =
    Array.isArray(i18n.options.fallbackLng) &&
    i18n.options.fallbackLng?.includes(language);
  const basePath = isDefaultLanguage
    ? `/${basePath_}`
    : `/${basePath_}/${language}`;

  return (
    <React.Fragment>
      {nav && nav.length > 0 && (
        <nav
          sx={{
            "a:not(:last-of-type)": { mr: 3 },
            fontSize: [1, `18px`],
            ".active": { color: `heading` },
          }}
        >
          {nav.map((item) => {
            return (
              <Link
                key={item?.title}
                activeClassName="active"
                sx={(t) => {
                  return { ...t.styles?.a };
                }}
                to={replaceSlashes(`${basePath}/${item.slug}`)}
              >
                {t(item.title)} 
              </Link>
            );
          })}
        </nav>
      )}
    </React.Fragment>
  );
};

export default Navigation;
