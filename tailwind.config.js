module.exports = {
	mode     : 'jit',
	purge    : [ './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}' ],
	darkMode : false, // or 'media' or 'class'
	theme    : {
		extend     : {},
		fontFamily : {
			sans    : [ 'Gotham', 'ui-sans-serif', 'system-ui' ],
			serif   : [ 'ui-serif', 'Georgia' ],
			mono    : [ 'ui-monospace', 'SFMono-Regular' ],
			display : [ 'Oswald' ],
			body    : [ 'Open Sans' ]
		}
	},
	variants : {
		extend : {}
	},
	plugins  : []
};
