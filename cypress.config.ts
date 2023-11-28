import { defineConfig } from "cypress";
import { cypressBrowserPermissionsPlugin } from 'cypress-browser-permissions';

export default defineConfig({
  env: {
    browserPermissions: {
      notifications: "allow",
      geolocation: "allow",
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  
  e2e: {
    experimentalFetchPolyfill: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      config = cypressBrowserPermissionsPlugin(on, config);
      config.env.browserPermissions = {
        geolocation: 'allow',
      };
      return config;
    },
  }
});
