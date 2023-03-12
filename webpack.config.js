const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

//this export included as a potential compiler for the TS server
//can compile front end & backend as separate bundles, then pack into docker image
//currently, TS server is dockerized as TS, then TS-node transpiles to JS on docker run
module.exports = {
  // mode: process.env.NODE_ENV || 'production',
  entry: './src/client/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/',
    filename: 'bundle.js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      filename: './index.html',
      favicon: path.resolve(
        __dirname,
        './src/client/public/assets/favicon.ico'
      ),
      logo: path.resolve(__dirname, './src/client/public/assets/logo.png'),
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, '/src/client'),
    },
    proxy: {
      '/': 'http://localhost:3535/',
      secure: false,
    },
    compress: true,
    host: process.env.PROXY_HOST,
    port: 7070,
    //enable HMR on the devServer
    hot: true,
    // fallback to root for other urls
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.(png)$/i,
        loader: 'file-loader',
        options: {
          name: '/public/assets/logo.png',
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
  },
};
