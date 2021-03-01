"use strict";

var path = require('path');

var HTMLWebpackPlugin = require('html-webpack-plugin'); //const {CleanWebpackPlugin} = require('clean-webpack-plugin');


var CopyWebpackPlugin = require('copy-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin'); //const TerserPlugin = require('terser-webpack-plugin');
//const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
  entry: './src/index.js',
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [new HTMLWebpackPlugin({
    template: './src/index.html'
  }), new MiniCssExtractPlugin({
    filename: 'style.css'
  }), new CopyWebpackPlugin({
    patterns: [{
      from: './src/assets/favicon',
      to: 'favicon'
    }, {
      from: './src/assets/images',
      to: 'images'
    }, {
      from: './src/assets/fonts',
      to: 'fonts'
    }]
  })],
  module: {
    rules: [{
      test: /\.s[ac]ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: 'http://127.0.0.1:5500/dist/'
        }
      }, 'css-loader', 'sass-loader']
    }, {
      test: /\.m?js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }, {
      test: /\.(svg|png|jpe?g|gif)$/i,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      loader: 'file-loader',
      options: {
        name: '[path][name].[ext]'
      }
    }]
  }
};