// This is the main react-router configuration.
// The App component is the parent container with Index being the index Route.
// Child routes are also defined

const rootRoute = {
    //component: 'div',
    childRoutes: [{
        path: '/',
        component: require('../../Components/App'),
        indexRoute: {
            component: require('../../Components/Index')
        },
        childRoutes: [
            require('../About'),
            require('../Users'),
        ],
    }]
}

module.exports = rootRoute;