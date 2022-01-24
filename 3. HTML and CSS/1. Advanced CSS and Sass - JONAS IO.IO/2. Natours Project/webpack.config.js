/*jshint esversion: 11*/
/* eslint-env es12 */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    assetModuleFilename: 'imgs/[name].[hash][ext]',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          'style-loader',
          // MiniCssExtractPlugin.loader,
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

  devtool: 'source-map',
};

// process.env.NODE_ENV !== 'production'
// ? 'style-loader'
// : MiniCssExtractPlugin.loader,
