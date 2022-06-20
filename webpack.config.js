const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  name: 'deployment',
  mode: 'production',
  entry: './src/app.ts',
  target: 'node',
  externals: [nodeExternals()],
  devtool: 'hidden-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  optimization: {
    usedExports: true,
  },

};