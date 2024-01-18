const redirect = {};

redirect.dashboard = (req, res, next) => {
  console.log ('YOU ARE SIGNED IN');
  res.status(200).json({ redirect: '/login' });
};

module.exports = redirect;