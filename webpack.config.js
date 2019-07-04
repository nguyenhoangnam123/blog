const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const OUTDIR = path.resolve(__dirname, "dist");

const config = {
  entry: "./src/frontend/App.tsx",
  output: {
    filename: "bundle.js",
    path: OUTDIR
  },

  devServer: {
    contentBase: OUTDIR,
    compress: true,
    port: 8080,
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000"
      }
    ]
  },

  resolve: {
    alias: {
      Components: path.resolve(__dirname, "src", "frontend", "components"),
      Interface: path.resolve(__dirname, "src", "frontend", "interface")
    },
    extensions: [".ts", ".tsx", ".js", ".json", ".scss", ".css"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["awesome-typescript-loader"]
      },
      {
        enforce: "pre",
        test: /\.js?$/,
        use: ["source-map-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },

  plugins: [new HtmlWebpackPlugin(), new webpack.NamedModulesPlugin()]
};

module.exports = config;
