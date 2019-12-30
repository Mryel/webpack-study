
// webpack.config.js

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const vueLoaderPlugin = require('vue-loader/lib/plugin')
const Webapck = require('webpack')
const devMode = process.argv.indexOf('--mode=prodution') === -1
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, "../src/index.js")
    },
    output: {
        filename: '[name].[hash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'js/[name].[hash:8].js'
    },
    
    module: {
        noParse: /jquery/,
        rules: [
            {
                test: /\.vue$/,
                use: ['vue-loader']
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [require('autoprefixer')]
                    }
                }, 'less-loader']
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'happypack/loader?id=happyBabel'
                }],
                exclude: /node_modules/
            },
            {
                test:/\.(jep?g|png|gif)$/,
                use:{
                  loader:'url-loader',
                  options:{
                    limit:10240,
                    fallback:{
                      loader:'file-loader',
                      options:{
                        name:'img/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              },
              {
                test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use:{
                  loader:'url-loader',
                  options:{
                    limit:10240,
                    fallback:{
                      loader:'file-loader',
                      options:{
                        name:'media/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
              },
              {
                test:/\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use:{
                  loader:'url-loader',
                  options:{
                    limit:10240,
                    fallback:{
                      loader:'file-loader',
                      options:{
                        name:'media/[name].[hash:8].[ext]'
                      }
                    }
                  }
                }
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['*', '.js', '.json', '.vue']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new CleanWebpackPlugin(),
        // require('autoprefixer')
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new vueLoaderPlugin(),
        new HappyPack({
            id: 'happyBabel',
            loaders: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                        ],
                        cacheDirectory: true
                    }
                }
            ],
            threadPool: happyThreadPool
        })
    ]
}
// 打包图片、字体、媒体等文件
            // {
            //     test: /\.(jpe?g|png|gif)$/i, //图片文件
            //     use: [
            //         {
            //             loader: 'url-loader',
            //             options: {
            //                 limit: 10240,
            //                 fallback: {
            //                 loader: 'file-loader',
            //                 options: {
            //                     name: 'img/[name].[hash:8].[ext]'
            //                 }
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
            //     use: [
            //         {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10240,
            //             fallback: {
            //             loader: 'file-loader',
            //             options: {
            //                 name: 'media/[name].[hash:8].[ext]'
            //             }
            //             }
            //         }
            //         }
            //     ]
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
            //     use: [
            //         {
            //         loader: 'url-loader',
            //         options: {
            //             limit: 10240,
            //             fallback: {
            //             loader: 'file-loader',
            //             options: {
            //                 name: 'fonts/[name].[hash:8].[ext]'
            //             }
            //             }
            //         }
            //         }
            //     ]
            // },
            // {
            //     test: /\.js$/,
            //     use: {
            //         loader: 'babel-loader',
            //         options: {
            //             preset: ['@babel/preset-env']
            //         }
            //     },
            //     exclude: /node_modules/
            // },
// 多入口文件
    // mode: 'development',
    // entry: {
    //     index: path.resolve(__dirname, '../src/index.js'),
    //     header: path.resolve(__dirname, '../src/header.js'),
    // },
    // output: {
    //     filename: '[name].[hash:8].js',
    //     path: path.resolve(__dirname, '../dist')
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: path.resolve(__dirname, '../public/index.html'),
    //         filename: 'index.html',
    //         chunks: ['index']
    //     }),
    //     new HtmlWebpackPlugin({
    //         template: path.resolve(__dirname, '../public/header.html'),
    //         filename: 'header.html',
    //         chunks: ['header']
    //     })
    // ]