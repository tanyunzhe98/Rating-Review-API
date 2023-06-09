var path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, 'public'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  }
};
