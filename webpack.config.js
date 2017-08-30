
module.exports = [{
  entry: "./src/app.js",
  target: "node",
  output: {
    path: __dirname + "/dist",
    filename: "app.js"
  },
  module : {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}];
