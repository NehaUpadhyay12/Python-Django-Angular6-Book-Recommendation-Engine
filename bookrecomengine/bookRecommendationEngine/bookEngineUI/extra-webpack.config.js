const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    plugins:[
        new BundleTracker({filename: '../webpack-stats-angular.json'})
    ],
    output: {
        path: require('path').resolve('../static/angular'),
        filename: "[name]-[hash].js"
    }
};
