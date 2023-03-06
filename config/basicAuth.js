module.exports = generate_BASIC_AUTH = (id, secret) => {
  const data = Buffer.from(`${id}:${secret}`).toString("base64");

  return data;
};
