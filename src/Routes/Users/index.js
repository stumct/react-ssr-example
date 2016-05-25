if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

module.exports = {
    path: 'users(/:userid)',
  
    getComponent(nextState, cb){
        require.ensure([], (require) => {
            cb(null, require('./Components/Users.jsx'))
        }, 'users')
    }
}