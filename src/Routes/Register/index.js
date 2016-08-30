if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

module.exports = {
  path: 'register',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Components/Register.jsx'));
    }, 'register');
  }
};