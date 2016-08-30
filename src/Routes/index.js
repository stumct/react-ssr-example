// This is the main react-router configuration.
// The App component is the parent container with Index being the index Route.
// Child routes are also defined

module.exports = {
    childRoutes: [{
        path: '/',
        component: require('../Components/App'),
        indexRoute: {
            component: require('./Home/Components/Home.jsx')
        },
        childRoutes: [
            require('./Test'),
            require('./Register'),
            require('./Login'),
        ],
    }]
}