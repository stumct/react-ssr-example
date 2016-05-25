if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

module.exports = {
    path: '/asdasd/asd/asd:userid', 
    getComponent(nextState, cb){
        require.ensure([], (require) => {
            cb(null, require('./Components/Details.jsx'))
        }, 'details')
    }
}