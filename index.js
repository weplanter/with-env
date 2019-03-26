#!/usr/bin/env node

const program = require('commander');
// const chalk = require('chalk');
const npmRunScript = require('npm-run-script');

const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const packageJson = resolveApp('package.json');
// const withEnvJson = resolveApp('.with-env.config.json');

const envMapper = {
    'dev': 'development',
    'test': 'test',
    'pre': 'pre-production',
    'pro': 'production'
}

function getEnvironment(command, env) {
    let environment = envMapper[env];
    if (!environment) {
        if (command === 'dev') {
            environment = 'development'
        } else {
            environment = 'production'
        }
    }
    return environment;
}

function isFileExist(path) {
    try {
        fs.accessSync(path, fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

function trimSpace(str) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

function getRunScript(environment, oldScript) {
    const crossEnvScript = `cross-env-shell NODE_ENV=${environment}`;
    return `${crossEnvScript} "${oldScript}"`;
}

// const withEnvConfig = isFileExist(withEnvJson) ? require(withEnvJson) : {};

// output help information on unknown commands
program
    .arguments('<command> [env] [options]')
    .action((command, env) => {
        const packageConfig = isFileExist(packageJson) ? require(packageJson) : {};
        const {
            scripts = {}
        } = packageConfig;
        if (scripts[command]) {
            const environment = getEnvironment(command, env);
            const runScript = getRunScript(environment, scripts[command])
            npmRunScript(runScript)
        } else {

        }
    })

program.parse(process.argv)
