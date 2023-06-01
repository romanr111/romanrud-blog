/** @jsx jsx */
import { Link } from "gatsby";
import { jsx } from "theme-ui";
import replaceSlashes from "../utils/replaceSlashes";
import useSiteMetadata from "../hooks/use-site-metadata";
import useMinimalBlogConfig from "../hooks/use-minimal-blog-config";
import { useTranslation } from "gatsby-plugin-react-i18next";

const HeaderTitle = () => {
  const { siteTitle } = useSiteMetadata();
  const { basePath } = useMinimalBlogConfig();
  const { t } = useTranslation();

  return (
    <Link
      to={replaceSlashes(`/${basePath}`)}
      aria-label={`${siteTitle} - Back to home`}
      sx={{ color: `heading`, textDecoration: `none` }}
    >
      <div sx={{ my: 0, fontWeight: `semibold`, fontSize: [3, 4] }}>
        {t(siteTitle)}
      </div>
    </Link>
  );
};

export default HeaderTitle;
