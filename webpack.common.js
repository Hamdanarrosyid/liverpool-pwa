const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    materializecss: './assets/css/materialize.min.css',
    materializejs: './assets/js/materialize.min.js',
  },
  devServer: {
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production-index',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/sw.js', to: 'sw.js' },
        { from: './src/manifest.json', to: 'manifest.json' },
        { from: './assets/js/idb.js', to: 'idb.js' },
        { from: './src/push.js', to: 'push.js' },
        { from: './assets/img/icon-512x512.png', to: 'icon/icon-512x512.png' },
        { from: './assets/img/icon-192x192.png', to: 'icon/icon-192x192.png' },
        { from: './assets/favicon', to: 'favicon' },
      ],
    }),
    // new InjectManifest({
    //   swSrc: './src/src-sw.js',
    //   swDest: 'sw.js',
    //   injectionPoint: 'manifest',
    // }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
