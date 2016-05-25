const rootRoute = {
    component: 'div',
    childRoutes: [{
        path: '/',
        component: require('../../Components/App'),
        indexRoute: {
            component: require('../../Components/Index')
        },
        childRoutes: [
            require('../Home'),
            require('../About'),
            require('../Users'),
        ],
    }]
}

module.exports = rootRoute;