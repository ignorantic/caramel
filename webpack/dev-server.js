module.exports = () => ({
  devtool: 'source-map',
  devServer: {
    stats: 'errors-only',
    port: 3000,
    contentBase: 'build',
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              include: '[name].css',
            },
          },
        ],
      },
    ],
  },
});
