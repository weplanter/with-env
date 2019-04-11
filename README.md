# with-env
一个 npm 命令行工具包，帮助你在执行npm/yarn命令时，根据不同参数可带上不同的环境变量


## 使用方式

### 安装

#### yarn

```
    yarn add @weplanter/with-env --dev
```

#### npm

```
    npm install @weplanter/with-env --save-dev
```

#### 使用

以 create-react-app 创建的项目举例

项目目录下 package.json 中 scripts 如下

```
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test",
        "eject": "react-scripts eject"
    },
```

使用 with-env 修改如下

```
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
    yarn start dev          // process.env.NODE_ENV = 'development'
    yarn start dev test     // process.env.NODE_ENV = 'test'
    yarn start dev pre      // process.env.NODE_ENV = 'pre-production'
    yarn start dev pro      // process.env.NODE_ENV = 'production'
```

