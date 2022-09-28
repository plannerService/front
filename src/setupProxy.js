const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
    app.use(
        '/login/google',
        createProxyMiddleware({
            target: `${process.env.REACR_APP_WEBSITE_BACK}`,
            changeOrigin: true,
        })
    )
}
