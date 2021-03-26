const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = env => {
    var config = {
        entry: {
            CreateView: "./src/creationView/CreateView.js",
            ResponseView: "./src/responseView/ResponseView.js",
            DetailView: "./src/resultView/DetailView.js"
        },
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, 'output/js')
        },
        resolve: {
            extensions: ['.js', ".css"]
        },
        module: {
            rules: [{
                test: /\.html?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: ['style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            url: true,
                        }
                    }]
            },
            {
                test: /\.(png|jpe?g|gif|svg)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "./images",
                        esModule: false
                    }
                }]
            }
            ]
        },
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        }
    };

    // Webpack plugins
    config.plugins = [];

    // For each entry there will be one html file
    var entries = Object.keys(config.entry);
    for (var entry of entries) {
        // Exclude other entries from this html
        var excludeChunks = entries.filter(x => x != entry);
        config.plugins.push(new HtmlWebpackPlugin({
            templateContent: '<div></div>',
            filename: `${entry}.html`,
            excludeChunks: excludeChunks
        }));
    }

    // Process other assets
    var copyAssets = {
        patterns: [{
                from: 'actionManifest.json',
                to: path.resolve(__dirname, 'output')
            },
            {
                from: 'actionModel.json',
                to: path.resolve(__dirname, 'output')
            },
            {
                from: 'views',
                to: path.resolve(__dirname, 'output')
            },
            {
                from: 'assets',
                to: path.resolve(__dirname, 'output')
            }
        ]
    };

    config.plugins.push(new CopyWebpackPlugin(copyAssets));
    config.plugins.push(new CleanWebpackPlugin());

    if (env.mode === 'dev') {
        config.mode = 'development';
        config.devtool = 'cheap-module-source-map';
    } else {
        config.mode = 'production'
    }

    if (env.watch === 'true') {
        config.watch = true;
    } else {
        config.watch = false;
    }
    return config;
}