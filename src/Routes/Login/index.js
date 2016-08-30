if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

module.exports = {
  path: 'login',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Components/Login.jsx'));
    }, 'login');
  }
};