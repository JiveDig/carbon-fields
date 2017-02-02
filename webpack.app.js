var path = require('path');
var webpack = require('webpack');

module.exports = {
	// These are the "entry points" to our application.
	// This means they will be the "root" imports that are included in JS bundle.
	entry: {
		'carbon.app': [
			// Load the core library.
			'./assets/react/lib/constants.js',
			'./assets/react/lib/events.js',
			'./assets/react/lib/factory.js',
			'./assets/react/lib/helpers.js',
			'./assets/react/lib/normalize.js',
			'./assets/react/lib/registry.js',

			// Load the containers.
			'./assets/react/containers/reducer.js',
			'./assets/react/containers/actions.js',
			'./assets/react/containers/selectors.js',
			'./assets/react/containers/constants.js',

			'./assets/react/containers/sagas/base.js',
			'./assets/react/containers/sagas/post-meta.js',
			'./assets/react/containers/sagas/term-meta.js',
			'./assets/react/containers/sagas/user-meta.js',
			'./assets/react/containers/sagas/theme-options.js',

			'./assets/react/containers/decorators/with-connect-to-store.js',
			'./assets/react/containers/decorators/with-initial-side-effects.js',

			'./assets/react/containers/components/container.js',
			'./assets/react/containers/components/broken-container.js',
			'./assets/react/containers/components/post-meta-container.js',
			'./assets/react/containers/components/comment-meta-container.js',
			'./assets/react/containers/components/user-meta-container.js',
			'./assets/react/containers/components/term-meta-container.js',
			'./assets/react/containers/components/theme-options-container.js',

			// Load the sidebars.
			'./assets/react/sidebars/reducer.js',

			// Load the fields.
			'./assets/react/fields/reducer',
			'./assets/react/fields/actions',
			'./assets/react/fields/selectors',
			'./assets/react/fields/helpers',

			'./assets/react/fields/decorators/with-store.js',
			'./assets/react/fields/decorators/with-setup.js',

			'./assets/react/fields/sagas/media-browser.js',
			'./assets/react/fields/sagas/geocoder.js',
			'./assets/react/fields/sagas/complex.js',

			'./assets/react/fields/components/field.js',
			'./assets/react/fields/components/association.js',
			'./assets/react/fields/components/checkbox.js',
			'./assets/react/fields/components/color.js',
			'./assets/react/fields/components/complex.js',
			'./assets/react/fields/components/datetime.js',
			'./assets/react/fields/components/file.js',
			'./assets/react/fields/components/html.js',
			'./assets/react/fields/components/map.js',
			'./assets/react/fields/components/radio.js',
			'./assets/react/fields/components/rich-text.js',
			'./assets/react/fields/components/select.js',
			'./assets/react/fields/components/separator.js',
			'./assets/react/fields/components/set.js',
			'./assets/react/fields/components/text.js',
			'./assets/react/fields/components/textarea.js',

			'./assets/react/fields/components/association-list-item.js',
			'./assets/react/fields/components/association-list.js',
			'./assets/react/fields/components/colorpicker.js',
			'./assets/react/fields/components/complex-actions.js',
			'./assets/react/fields/components/complex-empty-notice.js',
			'./assets/react/fields/components/complex-group.js',
			'./assets/react/fields/components/complex-popover.js',
			'./assets/react/fields/components/complex-tabs.js',
			'./assets/react/fields/components/datetimepicker.js',
			'./assets/react/fields/components/google-map.js',
			'./assets/react/fields/components/no-options.js',
			'./assets/react/fields/components/radio-image-list.js',
			'./assets/react/fields/components/radio-list.js',
			'./assets/react/fields/components/rich-text-editor.js',
			'./assets/react/fields/components/search-input.js',

			// Load the store.
			'./assets/react/store.js'
		]
	},

	// Setup the output.
	output: {
		// The output directory.
		path: 'assets/',

		// This is the JS bundle containing code from the entry points.
		filename: '[name].js',

		// The name of exported library.
		library: '[name]',

		// The output format.
		libraryTarget: 'this'
	},

	// Setup the transformation of the modules.
	module: {
		loaders: [
			// Process JS with Babel.
			{
				test: /\.js$/,
				loader: 'babel',
				query: {
					// Enable caching results for faster rebuilds.
					cacheDirectory: true
				}
			}
		]
	},

	// Add aliases for easier importing of the modules.
	resolve: {
		root: __dirname,
		modulesDirectories: [
			'node_modules',
			'assets/react'
		]
	},

	// Some of our dependencies are already loaded by WordPress.
	// So let's use them.
	//
	// Add "jQuery" here because the DLL plugin doesn't support
	// externals and can't be added in the vendors DLL file.
	externals: {
		'jquery': 'jQuery'
	},

	// Setup the source maps.
	devtool: 'cheap-module-eval-source-map',

	// Setup the plugins.
	plugins: [
		// Use the vendor DLL file.
		new webpack.DllReferencePlugin({
			context: __dirname,
			sourceType: 'this',
			manifest: require('./assets/carbon.vendor.json'),
		}),

		// Output a DLL file to be used by third party developers.
		new webpack.DllPlugin({
			context: __dirname,
			path: path.join(__dirname, 'assets', '[name].json'),
			name: '[name]'
		}),
	],
};
