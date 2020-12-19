module.exports = function override(config, env) {
    require('react-app-rewire-postcss')(config, {
        plugins: loader => [
            require('tailwindcss')(),
            require('autoprefixer')(),
            require('postcss-nesting')
        ]
    });

    return config;
}