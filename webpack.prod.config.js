//production workflow

const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map', // specify the source maps webpack should use
  entry: './src/index.js', //tell webpack to look and analize the dependencies on the index.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', //final concatinated JS file
    chunkFilename: '[id].js',
    publicPath: '' //the project file structure will be deploy to exactly the same as on development.
  },
  resolve: {
    extensions: ['.js', '.jsx'] // when a file without specified extension is imported, it will try to find files with these extensions
  },
  module: {
    rules: [
      {
        test: /\.js$/, // if it ends with .js, then load
        loader: 'babel-loader', //third party plugin
        exclude: /node_modules/ // only apply this rules to our own project files
      },
      {
        test: /\.css$/, // check if files end with .css and load them
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            ident: '[name]__[local]__[hash:base64:5]',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: ['> 1%', 'last 2 versions']
                })
              ]
            }
          }
        ] // setting loader/s with config. note: webpack read the loader from bottom to top (right to left).
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&name=images/[name].[ext]'
      }
    ] //correctly handling different files types
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
