module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'dev/js/test/**/*.spec.js',
      'dev/js/test/**/*.html',
    ],
    preprocessors: {
      'dev/**/*.js': ['webpack'],
      'dev/**/*.html': ['html2js'],
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              'babel-loader',
              'eslint-loader',
            ],
          },
        ],
      },
      node: {
        fs: 'empty',
        child_process: 'empty',
      },
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    // browsers: ['Opera'],
    singleRun: false,
    concurrency: Infinity,
  });
};
