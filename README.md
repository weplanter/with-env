# with-env
一个 npm 命令行工具包，帮助你在执行npm/yarn命令时，根据不同参数可带上不同的环境变量


## 使用方式

### 安装

#### 使用 yarn

```
    yarn add @weplanter/with-env --dev
```

#### 使用 npm

```
    npm install @weplanter/with-env --save-dev
```

#### create-react-app 举例

默认 create-react-app 创建出来的 package.json 中 scripts 如下

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

使用

```
    yarn start dev
```
