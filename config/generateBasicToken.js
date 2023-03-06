const generateBasicToken = (id, key) => {
  const basicAuth = Buffer.from(`${id}:${key}`).toString("base64");

  return basicAuth;
};

module.exports = generateBasicToken;
