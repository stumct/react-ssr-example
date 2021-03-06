if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

module.exports = {
  path: 'test',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require('./Components/Test.jsx'));
    }, 'test');
  }
};