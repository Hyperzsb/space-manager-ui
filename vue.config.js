module.exports = {
    productionSourceMap: false,
    outputDir: 'dist',   //build输出目录
    assetsDir: 'assets', //静态资源目录（js, css, img）
    lintOnSave: true, //是否开启eslint
    devServer: {
        port: '80',
        https: false,   //是否使用https协议
        hotOnly: false, //是否开启热更新
        proxy: {
            '/api': {
                target: 'http://localhost:8080', //API服务器的地址
                ws: true,  //代理WebSockets
                changeOrigin: true, // 虚拟的站点需要更管origin
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
