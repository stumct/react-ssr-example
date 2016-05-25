if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

module.exports = {
    path: 'about',
    
    getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Routes/Foo')
      ])
    })
  },
  
    getComponent(nextState, cb){
        require.ensure([], (require) => {
            cb(null, require('./Components/About.jsx'))
        }, 'about')
    }
}