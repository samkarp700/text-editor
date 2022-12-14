const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE',
        inject: true,
      }), 
      //workbox plugins
      new InjectManifest({
        swSrc: './src-sw.js', 
        swDest: 'src-sw.js'
      }), 
      new WebpackPwaManifest({
        name: 'Just Another Text Editor', 
        short_name: 'JATE', 
        description: 'Create and save code snippets reliably!',
        background_color: '#333333', 
        theme_color: '#333333', 
        start_url: './',
        publicPath: './',
        inject: true,
        fingerprints: false,
        icons: [
          {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
        // {
        // src: path.resolve('src/images/logo.png'),
        // size: '1024x1024',
        // destination: path.join('assets', 'icons'),
        // purpose: 'maskable'
        // }
      ],
      }),
    ],
    //css loaders
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\m$js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
              presets: [
                '@babel/preset-env', { targets: "defaults" }
              ]
            }
          }
        }
      ],
    },
  };
};
