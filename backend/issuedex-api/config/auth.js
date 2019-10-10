const development = {
  jwksUri:
    'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_PCO545GkS/.well-known/jwks.json',
};

const production = {
  jwksUri:
    'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_6xHlnKEr6/.well-known/jwks.json',
};

let auth;

switch (process.env.NODE_ENV) {
  case 'production':
    auth = production;
    break;
  default:
    auth = development;
}

module.exports = auth;
