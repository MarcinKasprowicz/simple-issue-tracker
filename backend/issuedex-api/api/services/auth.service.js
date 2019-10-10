const jwt = require('jsonwebtoken');
const jwks = require('jwks-rsa');

const auth = require('../../config/auth');

const client = jwks({
  jwksUri: auth.jwksUri,
});

const getKey = (header, callback) =>
  client.getSigningKey(header.kid, (err, key) => callback(null, key.publicKey || key.rsaPublicKey));

const authService = () => {
  const verify = (token, callback) => jwt.verify(token, getKey, {}, callback);

  return {
    verify,
  };
};

module.exports = authService;
