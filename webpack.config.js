const webpack = require('webpack')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
console.log(gitRevisionPlugin.version());
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    VERSION: JSON.stringify(gitRevisionPlugin.version())
                }
            })
        ]
    },
}