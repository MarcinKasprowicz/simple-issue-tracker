const development = {
  database: 'issuedex-db',
  username: 'issuedex-user',
  password: 'issuedex-pass',
  host: 'localhost',
  dialect: 'postgres',
};

const production = {
  database: process.env.RDS_DB_NAME,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  host: process.env.RDS_HOSTNAME,
  dialect: 'postgres',
};

module.exports = {
  development,
  production,
};
