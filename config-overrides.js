module.exports = function override(config, env) {
    require('react-app-rewire-postcss')(config, {
        plugins: loader => [
            require('tailwindcss')(),
            require('autoprefixer')()
        ]
    });

    return config;
}