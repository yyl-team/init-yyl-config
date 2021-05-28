/*!
 * init-yyl-config cjs 0.2.0
 * (c) 2020 - 2021 
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var yylConfigTypes = require('yyl-config-types');

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
    version: '',
    /** 是否使用 yarn */
    yarn: true,
    seed: 'base'
};
/** 默认服务器配置 */
const DEFAULT_LOCAL_SEVER_CONFIG = {
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
const DEFAULT_COMMIT_CONFIG = {
    revAddr: '',
    hostname: '/'
};
/** 初始化 yyl.config */
function initYylConfig(fn) {
    const r = (props) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const { env } = props;
        let yylConfig = fn({ env });
        // 基本信息初始化
        yylConfig = Object.assign(Object.assign({}, DEFAULT_PROJECT_INFO), yylConfig);
        // 本地 server
        yylConfig.localserver = Object.assign(Object.assign({}, DEFAULT_LOCAL_SEVER_CONFIG), yylConfig.localserver);
        // proxy
        yylConfig.proxy = Object.assign(Object.assign({}, DEFAULT_PROXY_CONFIG), yylConfig.proxy);
        // dest
        yylConfig.dest = Object.assign(Object.assign({}, DEFAULT_DEST_CONFIG), yylConfig.dest);
        // commit
        yylConfig.commit = Object.assign(Object.assign({}, DEFAULT_COMMIT_CONFIG), yylConfig.commit);
        if (!yylConfig.commit.revAddr) {
            yylConfig.commit.revAddr = `${(_a = yylConfig.commit) === null || _a === void 0 ? void 0 : _a.hostname}${yylConfig.dest.basePath}/${yylConfig.dest.revPath}`.replace(/[\/]+/, '/');
        }
        // px2rem
        if (yylConfig.px2rem === undefined) {
            yylConfig.px2rem = yylConfig.platform === 'mobile';
        }
        // alias 初始化
        const DEST_BASE_PATH = path__default['default'].join(yylConfig.localserver.root || process.cwd(), yylConfig.dest.basePath);
        yylConfig.alias = {
            /** 输出目录中 到 html, js, css, image 层 的路径 */
            root: DEST_BASE_PATH,
            /** rev 输出内容的相对地址 */
            revRoot: DEST_BASE_PATH,
            /** dest 地址 */
            destRoot: (_b = yylConfig.localserver) === null || _b === void 0 ? void 0 : _b.root,
            /** src 地址 */
            srcRoot: './src',
            /** 项目根目录 */
            dirname: './',
            /** js 输出地址 */
            jsDest: path__default['default'].join(DEST_BASE_PATH, (_c = yylConfig.dest) === null || _c === void 0 ? void 0 : _c.jsPath),
            /** html 输出地址 */
            htmlDest: path__default['default'].join(DEST_BASE_PATH, (_d = yylConfig.dest) === null || _d === void 0 ? void 0 : _d.htmlPath),
            /** css 输出地址 */
            cssDest: path__default['default'].join(DEST_BASE_PATH, (_e = yylConfig.dest) === null || _e === void 0 ? void 0 : _e.cssPath),
            /** images 输出地址 */
            imagesDest: path__default['default'].join(DEST_BASE_PATH, (_f = yylConfig.dest) === null || _f === void 0 ? void 0 : _f.imagesPath),
            /** rev-manifest 输出地址 */
            revDest: path__default['default'].join(DEST_BASE_PATH, (_g = yylConfig.dest) === null || _g === void 0 ? void 0 : _g.revPath),
            basePath: (_h = yylConfig.dest) === null || _h === void 0 ? void 0 : _h.basePath
        };
        // 初始化处理
        return yylConfig;
    };
    return r;
}

exports.DEFAULT_COMMIT_CONFIG = DEFAULT_COMMIT_CONFIG;
exports.DEFAULT_DEST_CONFIG = DEFAULT_DEST_CONFIG;
exports.DEFAULT_LOCAL_SEVER_CONFIG = DEFAULT_LOCAL_SEVER_CONFIG;
exports.DEFAULT_PROJECT_INFO = DEFAULT_PROJECT_INFO;
exports.DEFAULT_PROXY_CONFIG = DEFAULT_PROXY_CONFIG;
exports.initYylConfig = initYylConfig;
Object.keys(yylConfigTypes).forEach(function (k) {
  if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
    enumerable: true,
    get: function () {
      return yylConfigTypes[k];
    }
  });
});
