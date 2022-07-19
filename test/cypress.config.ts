import { defineConfig } from "cypress";

export default defineConfig({
  // experimentalStudio: true,
  viewportWidth: 1000,

  viewportHeight: 700,

  retries: {
    runMode: 2,
    openMode: 2,
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
