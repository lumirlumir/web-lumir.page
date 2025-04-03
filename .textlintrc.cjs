module.exports = {
  rules: {
    'allowed-uris': {
      allowed: {
        images: [/^\/public\/images\//],
      },
      disallowed: {
        links: [/^\.\//],
      },
    },
  },
};
