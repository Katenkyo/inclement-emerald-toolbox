const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  mode: "development",
  target: "web",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/",
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
    alias: {
      "@common": path.resolve(__dirname, "src", "common"),
      "@assets": path.resolve(__dirname, "assets"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      serveIndex: true,
    },
    watchFiles: ["src/**/*"],
    compress: true,
    port: 3000,
    hot: true,
    client: {
      overlay: true,
      progress: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.json",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      clean: true,
    }),
  ],
};
