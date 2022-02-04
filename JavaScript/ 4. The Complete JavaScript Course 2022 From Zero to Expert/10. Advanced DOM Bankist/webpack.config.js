/*jshint esversion: 11*/
/* eslint-env es12 */

const WebpackCriticalCSSInliner = require('webpack-critical-css-inliner');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  cache: false,
  entry: path.resolve(__dirname, 'src/', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'webpack-critical-css-inliner.js',
    assetModuleFilename: '[name][ext]',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          // 'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(svg|ico|png|jpg|jpeg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      // hash: false,
      // // inject: false,
    }),

    new MiniCssExtractPlugin(),

    new WebpackCriticalCSSInliner({
      base: 'dist/',
      src: 'index.html',
      target: 'index-critical.html',
      inlineGoogleFonts: true,
      minify: true,
    }),
  ],

  devtool: 'source-map',
};

// process.env.NODE_ENV !== 'production'
// ? 'style-loader'
// : MiniCssExtractPlugin.loader,
