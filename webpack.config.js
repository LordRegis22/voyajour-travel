const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  devServer: {
    publicPath: '/dist',
    contentBase: './client',
    port: 8080,
    proxy: {
      '/main': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/signup': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/itinerary': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.jsx?/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env', '@babel/preset-react'],
      //     },
      //   },
      // },
      {
        test: /\.s?[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'awesome-typescript-loader' },
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: '/.js$/',
        loader: 'source-map-loader',
      },
    ],
  },
  // resolve: {
  //   extensions: ['.js', '.jsx'],
  // },
};
