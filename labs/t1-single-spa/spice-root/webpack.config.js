const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "spiceroute";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const merged = merge(defaultConfig, {
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });

  // Force SystemJS output (newer webpack-config-single-spa defaults to native
  // ESM; our Angular MFEs are UMD, so the floor speaks SystemJS throughout).
  merged.experiments = { ...(merged.experiments || {}), outputModule: false };
  merged.output = { ...(merged.output || {}), libraryTarget: "system", module: false };
  merged.externalsType = "system";
  return merged;
};
