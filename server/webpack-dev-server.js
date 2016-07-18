
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevConfig from '../webpack.config.js'


const configureDevServer = (app) => {
    const compiler = webpack(webpackDevConfig);
    app.use(webpackDevMiddleware(compiler, {
    // all options optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    //lazy: true,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // watch options (only lazy: false)

    publicPath: "/dist",
    // public path to bind the middleware to
    // use the same as in webpack

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
        colors: true
    }
    // options for formating the statistics
}));
    app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
    }))
}

export default configureDevServer