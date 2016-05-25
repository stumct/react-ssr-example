if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

module.exports = {
    path: 'foo', 
    getComponent(nextState, cb){
        require.ensure([], (require) => {
            cb(null, require('./Components/Foo.jsx'))
        }, 'foo')
    }
}