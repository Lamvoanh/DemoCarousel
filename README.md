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

## Build and run project


### Download the source code at
[https://github.com/Lamvoanh/DemoCarousel.git](https://github.com/Lamvoanh/DemoCarousel.git)

### Move to DemoCarousel folder and install dependancy
> npm install

### Start webpack server
> npm run start

### Run on Browser with local url
[localhost:8080](localhost:8080)

## Usage Manual

### Functionality
- Support navigator the carousel by the navigator button
- Support navigator the carousel by mouse down and swipe on computers
- Support navigator the carousel by touch swipe on mobile devices
- Support jumping to an item by click on its thumbnail item on the thumbnail bar
- Support finger-following when draft on computers or swipe on mobile devices
- Support navigator and scroll the thumbnail bar

### Import and implement
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
### Component Properties
| Property      | Description   | Example   |
| - | - | -- |
| activeIndex   | The index of element will be showed on the carousel. Start from 0. Defautl 0 | ```<MultiCarousel activeIndex={3}>...</MultiCarousel>``` |
| styleProps    | The property object will apply on the main tag of the carousel such as **width**, **height** and so on.    | ```<MultiCarousel styleProps={{width: '100%', height:'100%'}}>...</MultiCarousel> ```|
| showBtn   | Show navigator button to naviget the carousel. Value **true** or **false** | ```<MultiCarousel showBtn={true}>...</MultiCarousel>``` |

### Demo
[https://democarousel.herokuapp.com/](https://democarousel.herokuapp.com/)

### Screen shot
![PC](https://user-images.githubusercontent.com/42895365/103852633-5f8f2a80-5100-11eb-9b28-8c3329ef6c8d.png)
![IOS](https://user-images.githubusercontent.com/42895365/103852914-08d62080-5101-11eb-9d8c-3578f9c11062.jpg)
![Android](https://user-images.githubusercontent.com/42895365/103853374-02947400-5102-11eb-8b82-ac7ffef06215.png)
