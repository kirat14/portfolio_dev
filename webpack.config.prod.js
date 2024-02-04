const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require('path');

module.exports = function (env, argv) {
  const version = '1.0.0';
  return {
    mode: 'production',
    entry: [
      './src/app.js'
    ],
    output: {
      filename: `main.js?v=${version}`,
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      minimizer: [
        new OptimizeCSSAssetsPlugin()
      ]
    }
    ,
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['dist'],
      }),
      new HtmlWebpackPlugin({
        title: 'Webpack starter project',
        template: path.resolve('./src/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: `[name].css?v=${version}`,
        chunkFilename: `[id].css?v=${version}`,
      }),
      new MinifyPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(jpg|jpeg|gif|png|svg|webp)$/,
          include: path.resolve(__dirname, './src/img'),
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: 'img',
                name: "[name].[ext]",
              },
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: false,
                  quality: 75
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: true,
                },
                pngquant: {
                  quality: [0.65, 0.90],
                  speed: 4
                },
                gifsicle: {
                  interlaced: true,
                  optimizationLevel: 3
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 20
                }
              }
            },
          ],
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          }
        },
      ]
    }
  };
}