/*!
 * init-yyl-config cjs 0.1.4
 * (c) 2020 - 2021 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

/** 默认项目配置 */
const DEFAULT_PROJECT_INFO = {
    /** 项目名称 */
    name: '',
    /** seed 类型 */
    workflow: 'webpack',
    /** 平台类型 */
    platform: 'pc',
    /** yyl 版本 */
    yylVersion: '',
    /** src 路径 */
    srcRoot: './src',
    /** 是否使用 yarn */
    yarn: true,
    seed: 'base'
};
/** 默认服务器配置 */
const DEFAULR_LOCAL_SEVER_CONFIG = {
    /** server映射路径 */
    root: './dist',
    /** 端口 */
    port: 5000
};
/** 默认反向代理配置 */
const DEFAULT_PROXY_CONFIG = {
    /** 端口 */
    port: 8887,
    /** 映射 map */
    localRemote: {}
};
/** 默认 输出 配置 */
const DEFAULT_DEST_CONFIG = {
    basePath: '/',
    jsPath: 'js',
    cssPath: 'css',
    htmlPath: 'html',
    imagesPath: 'image',
    revPath: 'assets'
};
const DEFAULT_COMMIT = {
    revAddr: '',
    hostname: '/'
};
/** 初始化 yyl.config */
function initYylConfig(option) {
    const { merge } = option;
    const projectInfo = Object.assign(Object.assign({}, DEFAULT_PROJECT_INFO), option.projectInfo);
    const localserver = Object.assign(Object.assign({}, DEFAULR_LOCAL_SEVER_CONFIG), option.localserver);
    const proxy = Object.assign(Object.assign({}, DEFAULT_PROXY_CONFIG), option.proxy);
    const dest = Object.assign(Object.assign({}, DEFAULT_DEST_CONFIG), option.dest);
    const commit = Object.assign(Object.assign({}, DEFAULT_COMMIT), option.commit);
    const DEST_BASE_PATH = path__default['default'].join(localserver.root || process.cwd(), dest.basePath);
    const makeYylConfig = ({ env }) => {
        const yylConfig = {
            name: projectInfo.name,
            workflow: projectInfo.workflow,
            version: projectInfo.yylVersion,
            seed: projectInfo.seed,
            platform: projectInfo.platform,
            px2rem: projectInfo.platform === 'mobile',
            base64Limit: 3000,
            localserver,
            proxy,
            dest,
            alias: {
                /** 输出目录中 到 html, js, css, image 层 的路径 */
                root: DEST_BASE_PATH,
                /** rev 输出内容的相对地址 */
                revRoot: DEST_BASE_PATH,
                /** dest 地址 */
                destRoot: localserver === null || localserver === void 0 ? void 0 : localserver.root,
                /** src 地址 */
                srcRoot: projectInfo.srcRoot,
                /** 项目根目录 */
                dirname: './',
                /** js 输出地址 */
                jsDest: path__default['default'].join(DEST_BASE_PATH, dest === null || dest === void 0 ? void 0 : dest.jsPath),
                /** html 输出地址 */
                htmlDest: path__default['default'].join(DEST_BASE_PATH, dest === null || dest === void 0 ? void 0 : dest.htmlPath),
                /** css 输出地址 */
                cssDest: path__default['default'].join(DEST_BASE_PATH, dest === null || dest === void 0 ? void 0 : dest.cssPath),
                /** images 输出地址 */
                imagesDest: path__default['default'].join(DEST_BASE_PATH, dest === null || dest === void 0 ? void 0 : dest.imagesPath),
                /** rev-manifest 输出地址 */
                revDest: path__default['default'].join(DEST_BASE_PATH, dest === null || dest === void 0 ? void 0 : dest.revPath),
                basePath: dest === null || dest === void 0 ? void 0 : dest.basePath,
                publicPath: commit.hostname
            },
            commit
        };
        if (merge) {
            return merge({
                yylConfig,
                env
            });
        }
        else {
            return yylConfig;
        }
    };
    return makeYylConfig;
}

exports.DEFAULR_LOCAL_SEVER_CONFIG = DEFAULR_LOCAL_SEVER_CONFIG;
exports.DEFAULT_COMMIT = DEFAULT_COMMIT;
exports.DEFAULT_DEST_CONFIG = DEFAULT_DEST_CONFIG;
exports.DEFAULT_PROJECT_INFO = DEFAULT_PROJECT_INFO;
exports.DEFAULT_PROXY_CONFIG = DEFAULT_PROXY_CONFIG;
exports.initYylConfig = initYylConfig;
