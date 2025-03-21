/** @jsx jsx */
import * as React from 'react';
import { Global } from '@emotion/react';
import { Box, Container, jsx, get } from 'theme-ui';
import { MDXProvider } from '@mdx-js/react';
import MdxComponents from './mdx-components';
import Header from './header';
import Footer from './footer';
import CodeStyles from '../styles/code';
import SkipNavLink from './skip-nav';
import Seo from './seo';
import AnalyticsWrapper from '../../../components/AnalyticsWrapper';
import PageTracker from '../../../components/PageTracker';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  canonicalUrl?: string;
};

const Layout = ({ children, className = ``, ...props }: LayoutProps) => (
  <React.Fragment>
    <AnalyticsWrapper>
      <Seo {...props} />
      <PageTracker />
      <MDXProvider components={MdxComponents}>
        <Global
          styles={(t) => ({
            '*': {
              boxSizing: `inherit`,
            },
            html: {
              WebkitTextSizeAdjust: `100%`,
            },
            body: {
              fontFamily: `'Open Sans'`,
            },
            img: {
              borderStyle: `none`,
            },
            pre: {
              fontFamily: `roboto`,
              fontSize: `1em`,
            },
            '[hidden]': {
              display: `none`,
            },
            '::selection': {
              backgroundColor: get(t, `colors.text`),
              color: get(t, `colors.background`),
            },
            a: {
              transition: `all 0.3s ease-in-out`,
              color: `text`,
            },
          })}
        />
        <SkipNavLink>Skip to content</SkipNavLink>
        <Container>
          <Header />
          <Box
            id="skip-nav"
            as="main"
            variant="layout.main"
            sx={{ ...CodeStyles }}
            className={className}
          >
            {children}
          </Box>
          <Footer />
        </Container>
      </MDXProvider>
    </AnalyticsWrapper>
  </React.Fragment>
);

export default Layout;
