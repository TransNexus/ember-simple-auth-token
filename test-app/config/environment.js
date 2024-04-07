'use strict';

const { MIRAGE_SCENARIO } = process.env;

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'test-app',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    MIRAGE_SCENARIO,

  };

  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'authenticated.index',
    routeAfterInvalidation: 'login',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:3000/api/token-auth',
      serverTokenRefreshEndpoint: 'http://localhost:3000/api/token-refresh/',
      refreshAccessTokens: true
    }

    ENV['ember-cli-mirage'] = {
      enabled: false
    };
    ENV.api = 'http://localhost:3000';
  }

  if (environment === 'mirage') {
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:8080/api/token-auth',
      serverTokenRefreshEndpoint: 'http://localhost:8080/api/token-refresh/',
      refreshAccessTokens: true
    }

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV.api = 'http://localhost:8080';
  }

  if (environment === 'mirage-test') {
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:8080/api/token-auth',
      serverTokenRefreshEndpoint: 'http://localhost:8080/api/token-refresh/',
      refreshAccessTokens: false
    }

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV.api = 'http://localhost:8080';
  }

  if (environment === 'test') {
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://localhost:3000/api/token-auth',
      serverTokenRefreshEndpoint: 'http://localhost:3000/api/token-refresh/',
      refreshAccessTokens: false
    }

    ENV['ember-cli-mirage'] = {
      enabled: true
    };
    ENV.api = 'http://localhost:8080';
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
