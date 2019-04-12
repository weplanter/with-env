# with-env
一个npm命令行工具包，帮助你在执行 npm/yarn 命令时，根据不同参数可带上不同的环境变量。

## 为什么需要它 ？
假设我们已经设计好的项目启动开发模式的命令如下：

```javascript

// package.json

scripts: {
    'dev': 'webpack webpack.dev.config.js'
}
    
```

执行：

```shell

yarn dev

```

加一个场景：当我们需要在开发模式下调试线上环境的bug的时候，也就是我们需要启动开发模式，但是环境变量想要切换到生产环境。

为了满足需求及操作的方便，我们可能需要增加一条命令。

```javascript

// package.json

scripts: {
    'dev': 'webpack webpack.dev.config.js',
    'dev:pro': 'webpack webpack.pro.config.js',
}
    
```

执行：

```shell

yarn dev:pro

```

通常我们在实际项目中可能会存在很多的环境如：
* development     开发环境
* test            测试环境
* pre-production  预发布环境
* production      生产环境


于是乎我们的项目里需要存在四个环境对应的配置文件

```javascript

webpack.dev.config.js
webpack.test.config.js
webpack.pre-pro.config.js
webpack.pro.config.js

```

以及 package.json 里的 scripts 命令配置

```javascript

// package.json

scripts: {
    'dev': 'webpack --config webpack.dev.config.js',
    'dev:test': 'webpack --config webpack.test.config.js',
    'dev:pre': 'webpack --config webpack.pre-pro.config.js',
    'dev:pro': 'webpack --config webpack.pro.config.js'
}

```
如果再加上 build 命令，或者其他更多的自定义命令时候，区分环境变量的配置将会使得我们的项目十分臃肿。不够简介。

那是否我们可以只有一个命令，用另外一个工具来帮助我们区分不同的环境变量，我们在 webpack.config.js 中根据不同的环境变量来直接使用呢 ？

```shell

yarn dev + 环境参数

```

with-env 的设计目的，就是来帮你简化环境变量的定义过程。
> 它只是一个小工具，即使你不使用它，也可以通过上面的方式，或者 export 环境变量+多个scripts 命令的方式来满足功能的需求，它只能帮你把项目变的更整洁。


## 使用方式

### 安装

#### yarn

```shell
yarn add @weplanter/with-env --dev
```

#### npm

```shell

npm install @weplanter/with-env --save-dev
```

#### 使用

以 create-react-app 创建的项目举例

package.json 中的 scripts 对象如下：

```javascript

"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}

```

使用 with-env 修改如下
* 修改 start 名称为 dev
* 添加 start 命令 "start" : "with-env"

```javascript

"scripts": {
    "start": "with-env",
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}

```

执行
使用 yarn start + 之前定义好的其他命令 + 环境参数(默认为 dev)

```javascript

// yarn we [scripts命令] [环境名称]

yarn start dev          // process.env.NODE_ENV = 'development'
yarn start dev test     // process.env.NODE_ENV = 'test'
yarn start dev pre      // process.env.NODE_ENV = 'pre-production'
yarn start dev pro      // process.env.NODE_ENV = 'production'

yarn start build        // process.env.NODE_ENV = 'development'
yarn start build test   // process.env.NODE_ENV = 'test'
yarn start build pre    // process.env.NODE_ENV = 'pre-production'
yarn start build pro    // process.env.NODE_ENV = 'production'

```

#### create-react-app 项目中的 js/jsx 中使用环境变量

```javascript

if( process.env.NODE_ENV === 'development' ){
    // ...todo someting
}

```

#### 或配合 webpack 插件 webpack.DefinePlugin 使用，在项目文件中使用对应的变量

```javascript

const webpack = require('webpack');

export default {
    ...otherWebpackConfig,
    plugins: [
        new webpack.DefinePlugin({
            '__DEV__': process.env.NODE_ENV === 'development',
            '__TEST__': process.env.NODE_ENV === 'test',
            '__PRE_PRO__': process.env.NODE_ENV === 'pre-production',
            '__PRO__': process.env.NODE_ENV === 'production'
        }),
    ] 
}

```

在项目中使用环境变量

```javascript

let requestPrefix = '';

if(__DEV__){
    requestPrefix = 'http://some-dev-request-prefix'
}
if(__TEST__){
    requestPrefix = 'http://some-test-request-prefix'
}
if(__PRE_PRO__){
    requestPrefix = 'http://some-pre-production-request-prefix'
}
if(__PRO__){
    requestPrefix = 'http://some-production-request-prefix'
}

const USER_INFO = `${requestPrefix}/users/:user_id`;

fetch(USER_INFO).then(function(response) {
    // do something
})

```


#### .withenvrc.js / .withenvrc 配置

Todo...

