const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = () => ({
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            'autoprefixer-loader',
            'resolve-url-loader',
            'sass-loader',
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false,
    }),

    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
  ],
});
