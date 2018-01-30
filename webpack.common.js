/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		app: './src/index.js',
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			title: 'Production',
			template: 'src/index.html',
			inject: 'body',
		}),
		new ExtractTextPlugin({ filename: 'style.css' }),
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	resolve: {
		modules: [path.resolve(__dirname, 'src'), 'node_modules'],
	},
	node: {
		dns: "mock",
		fs: "empty",
		path: true,
		url: false,
		net: 'mock',
		tls: 'mock',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['es2015', 'stage-3', 'react'],
						plugins: [
							['transform-class-properties', 'transform-runtime', {
								helpers: false,
								polyfill: false,
								regenerator: true,
								moduleName: 'babel-runtime',
							}],
						],
					},
				},
			},
			{
				test: /\.mod\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[name]_[local]',
							},
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: ['./src/styles'],
							},
						},
					],
				}),
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
			},
		],
	},
};
