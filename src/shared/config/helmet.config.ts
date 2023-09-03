import helmet from 'helmet';

const cspOptions = {
  directives: {
    ...helmet.contentSecurityPolicy.getDefaultDirectives(),

    'script-src': ["'self'", '*.googleapis.com', '*.kauth.kakao.com'],
    'img-src': ["'self'", 'data:', '*.amazonaws.com'],

    'base-uri': ['/', 'http:'],
  },
};

export const helmetOptions = { contentSecurityPolicy: cspOptions };
