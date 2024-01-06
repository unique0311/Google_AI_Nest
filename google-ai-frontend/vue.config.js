module.exports =
  {
    publicPath: "./",
    outputDir:"../google-ai-server/client",
    devServer: {
      proxy: "https://google-ai-server-2f3vvue3ua-wl.a.run.app/"
    }
  };
