if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

module.exports = {
  path: 'home',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Components/Home.jsx'));
    }, 'home');
  }
};