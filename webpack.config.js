const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'ClientComponent': './src/ClientComponent.js',
  	'WidgetComponent': './src/WidgetComponent.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    //library: '[name]_module',
  },
  optimization: {
    chunkIds: 'size',
    moduleIds: 'deterministic',
    concatenateModules: true,
    mangleWasmImports: true,
    mergeDuplicateChunks: false,
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

