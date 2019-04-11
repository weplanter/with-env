# with-env
一个 npm 命令行工具包，帮助你在执行npm/yarn命令时，根据不同参数可带上不同的环境变量


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

项目目录下 package.json 中 scripts 如下

```json
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
```

使用 with-env 修改如下

```json
    "scripts": {
        "start": "with-env",
        "dev": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
```

执行

```
    // yarn start [其他scripts定义的命令名称] [环境名称, 默认为 dev]
    
    yarn start dev              // process.env.NODE_ENV = 'development'
    yarn start dev test         // process.env.NODE_ENV = 'test'
    yarn start dev pre          // process.env.NODE_ENV = 'pre-production'
    yarn start dev pro          // process.env.NODE_ENV = 'production'
    
    yarn start build            // process.env.NODE_ENV = 'development'
    yarn start build test       // process.env.NODE_ENV = 'test'
    yarn start build pre        // process.env.NODE_ENV = 'pre-production'
    yarn start build pro        // process.env.NODE_ENV = 'production'
    
```


#### 配合 webpack.DefinePlugin 使用，在项目文件中使用对应的变量

```javascript
    new webpack.DefinePlugin({
        '__DEV__': process.env.NODE_ENV === 'development',
        '__TEST__': process.env.NODE_ENV === 'test',
        '__PRE_PRO__': process.env.NODE_ENV ==== 'pre-production',
        '__PRO__': process.env.NODE_ENV = 'production'
    }),
```

场景示例

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

