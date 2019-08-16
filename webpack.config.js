const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/app.jsx',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                include: [path.resolve(__dirname, 'client')],
                exclude: /node_module/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        ]
    }
}