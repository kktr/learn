/*jshint esversion: 11*/
/* eslint-env es12 */

const WebpackCriticalCSSInliner = require('webpack-critical-css-inliner');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
  },
  output: {
    /**
     * With zero configuration,
     *   clean-webpack-plugin will remove files inside the directory below
     */
    path: path.resolve(process.cwd(), 'dist'),
    // filename: 'webpack-critical-css-inliner.[contenthash].js',
    assetModuleFilename: '[name].[hash][ext]',
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
          'sass-loader',
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

    new WebpackCriticalCSSInliner({
      base: './dist',
      src: './index.html',
      target: './index-critical.html',
      inlineGoogleFonts: false,
      minify: true,
    }),

    new MiniCssExtractPlugin(),

    new HtmlWebpackPlugin({
      template: './src/template.html',
      // inject: false,
    }),
  ],

  devtool: 'source-map',
};

// process.env.NODE_ENV !== 'production'
// ? 'style-loader'
// : MiniCssExtractPlugin.loader,
