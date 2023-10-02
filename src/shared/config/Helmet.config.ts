import helmet from 'helmet';

export const helmetConfig = {
  helmetOptions: {
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),

        'script-src': ["'self'", '*.googleapis.com', '*.kauth.kakao.com'],
        'img-src': ["'self'", 'data:', '*.amazonaws.com'],

        'base-uri': ['/', 'http:'],
      },
    },
  },
};
