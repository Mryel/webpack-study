// webpack.dll.config.js
const path = require('path')
const webpack = require('webpack')
module.exports = {
    // 打包的模块的数组
    entry: {
        vendor: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../static/js'), // 打包后文件输出的位置
        filename: '[name].dll.js',
        library: '[name]_library'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        })
    ]
}