import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Layout from 'material-ui/Layout';
import createMuiTheme from 'material-ui/styles/theme';

import AppHeader from './AppHeader';

const PageLayout = (props, context) => {
  const {
    children,
  } = props;

  return (
    <MuiThemeProvider>
      <div>
        <Layout container direction="column" justify="flex-start" align="stretch" gutter={0}>
          <Layout item>
            <AppHeader title={'Info Pony'} />
          </Layout>
          <Layout item>
            <Layout container direction="row" justify="center" align="center" gutter={0}>
              <Layout item xs={12} sm={12} md={10} lg={8} xl={6}>
                {children}
              </Layout>
            </Layout>
          </Layout>
        </Layout>
      </div>
    </MuiThemeProvider>
  );
};

export default PageLayout;
