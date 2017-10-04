const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const merge = require('webpack-merge');
const devServer = require('./webpack/dev-server');
const build = require('./webpack/build');
const production = require('./webpack/production');


const common = {
  entry: {
    index: path.join(__dirname, 'dev/pages/index.js'),
    contacts: path.join(__dirname, 'dev/pages/contacts.js'),
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
            },
          },
          'eslint-loader',
        ],
      },

      {
        test: /\.modernizrrc.js$/,
        use: ['modernizr-loader'],
      },

      {
        test: /\.modernizrrc(\.json)?$/,
        use: [
          'modernizr-loader',
          'json-loader',
        ],
      },

      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },

      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        include: /sprite-src/,
        options: {
          emitFile: false,
        },
      },

      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        include: /fonts/,
        options: {
          outputPath: 'fonts/',
          name: '[name].[ext]',
        },
      },

      {
        test: /\.(jpe*g|png|gif|svg)$/,
        loader: 'file-loader',
        exclude: /(fonts|sprite-src)/,
        options: {
          outputPath: 'img/',
          name: '[name].[ext]',
        },
      },
    ],
  },

  resolve: {
    alias: {
      modernizr$: path.resolve(__dirname, '.modernizrrc'),
    },
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['common', 'index'],
      template: 'dev/pages/index.pug',
    }),

    new HtmlWebpackPlugin({
      filename: 'contacts.html',
      chunks: ['common', 'contacts'],
      template: 'dev/pages/contacts.pug',
    }),

    new SpritesmithPlugin({
      src: {
        cwd: 'dev/img/sprite-src',
        glob: '*.png',
      },
      target: {
        image: 'dev/img/sprite.png',
        css: 'dev/sass/_sprite.scss',
      },
      apiOptions: {
        cssImageRef: '../img/sprite.png',
      },
      spritesmithOptions: {
        padding: 5,
      },
    }),
  ],
};

module.exports = (env) => {
  if (env === 'production') {
    return merge([
      common,
      production(),
    ]);
  } else if (env === 'build') {
    return merge([
      common,
      build(),
    ]);
  }
  return merge([
    common,
    devServer(),
  ]);
};
