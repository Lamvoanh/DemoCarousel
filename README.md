# DemoCarousel
## Requirement
Node JS v15.5.1 and NPM v7.3.0

## Setting up the project
### Create project folder and move to the project
> mkdir DemoCarousel

> cd DemoCarousel

### Create json package
> npm init -y

### Install react and react document
> npm install react react-dom

### Install development dependency
> npm install --save-dev @babel/core
> npm install --save-dev @babel/preset-env
> npm install --save-dev @babel/preset-react
> npm install --save-dev webpack
> npm install --save-dev webpack-cli
> npm install --save-dev webpack-dev-server
> npm install --save-dev babel-loader
> npm install --save-dev css-loader
> npm install --save-dev style-loader
> npm install --save-dev html-webpack-plugin
> npm install --save-dev react-icons
> npm install --save-dev jquery

### Create webpack.config.js
```javascript
var path = require('path');
var HtmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry : './app/index.js',
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: 'index_bundle.js'
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            {test : /\.css$/, use:['style-loader', 'css-loader']}
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'app/index.html'
        })
    ],
    devServer: {
    host: '0.0.0.0',//your ip address
    port: 8080,
    disableHostCheck: true,
    }

}
````

# Build and run project


## Download the source code at
[https://github.com/Lamvoanh/DemoCarousel](https://github.com/Lamvoanh/DemoCarousel)

## Move to DemoCarousel folder and install dependancy
> npm install

## Start webpack server
> npm run start

## Run on Browser with local url
[localhost:8080](localhost:8080)

# Usage Manual
## Import and implement
```javascript
import MultiCarousel from '{path}/MultiCarousel'
...
<MultiCarousel>
  <div>
    <{tag}>content 1</{tag}>
  </div>
  <div>
    <{tag}>content 2</{tag}>
  </div>
  <div>
    <{tag}>content 3</{tag}>
  </div>
  ...
</MultiCarousel>
```
