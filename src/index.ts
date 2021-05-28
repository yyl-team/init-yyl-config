import path from 'path'
import {
  YylConfig,
  Env,
  DestConfig,
  LocalserverConfig,
  ProxyConfig,
  CommitConfig,
  YylConfigEntryFn
} from 'yyl-config-types'

export * from 'yyl-config-types'

export interface InitYylConfigFunctionProps {
  env: Env
}
export interface NiceYylConfig extends Omit<YylConfig, 'commit' | 'alias'> {
  alias?: {
    [key: string]: string
  }
  commit: {
    revAddr?: string
    hostname: string
    staticHost?: string
    mainHost?: string
  }
}

export type InitYylConfigCallback = (props: InitYylConfigFunctionProps) => NiceYylConfig

/** 默认项目配置 */
export const DEFAULT_PROJECT_INFO: Required<
  Pick<YylConfig, 'name' | 'workflow' | 'platform' | 'version' | 'yarn' | 'seed'>
> = {
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
}

/** 默认服务器配置 */
export const DEFAULT_LOCAL_SEVER_CONFIG: LocalserverConfig = {
  /** server映射路径 */
  root: './dist',
  /** 端口 */
  port: 5000
}

/** 默认反向代理配置 */
export const DEFAULT_PROXY_CONFIG: ProxyConfig = {
  /** 端口 */
  port: 8887,
  /** 映射 map */
  localRemote: {}
}

/** 默认 输出 配置 */
export const DEFAULT_DEST_CONFIG: DestConfig = {
  basePath: '/',
  jsPath: 'js',
  cssPath: 'css',
  htmlPath: 'html',
  imagesPath: 'image',
  revPath: 'assets'
}

export const DEFAULT_COMMIT_CONFIG: CommitConfig = {
  revAddr: '',
  hostname: '/'
}

/** 初始化 yyl.config */
export function initYylConfig(fn: InitYylConfigCallback): YylConfigEntryFn {
  const r: YylConfigEntryFn = (props) => {
    const { env } = props
    let yylConfig = fn({ env })

    // 基本信息初始化
    yylConfig = {
      ...DEFAULT_PROJECT_INFO,
      ...yylConfig
    }

    // 本地 server
    yylConfig.localserver = {
      ...DEFAULT_LOCAL_SEVER_CONFIG,
      ...yylConfig.localserver
    }

    // proxy
    yylConfig.proxy = {
      ...DEFAULT_PROXY_CONFIG,
      ...yylConfig.proxy
    }

    // dest
    yylConfig.dest = {
      ...DEFAULT_DEST_CONFIG,
      ...yylConfig.dest
    }

    // commit
    yylConfig.commit = {
      ...DEFAULT_COMMIT_CONFIG,
      ...yylConfig.commit
    }
    if (!yylConfig.commit.revAddr) {
      yylConfig.commit.revAddr = `${yylConfig.commit?.hostname}${yylConfig.dest.basePath}/${yylConfig.dest.revPath}`.replace(
        /[\/]+/,
        '/'
      )
    }

    // px2rem
    if (yylConfig.px2rem === undefined) {
      yylConfig.px2rem = yylConfig.platform === 'mobile'
    }

    // alias 初始化
    const DEST_BASE_PATH = path.join(
      yylConfig.localserver.root || process.cwd(),
      yylConfig.dest.basePath as string
    )
    yylConfig.alias = {
      /** 输出目录中 到 html, js, css, image 层 的路径 */
      root: DEST_BASE_PATH,
      /** rev 输出内容的相对地址 */
      revRoot: DEST_BASE_PATH,
      /** dest 地址 */
      destRoot: yylConfig.localserver?.root as string,
      /** src 地址 */
      srcRoot: './src',
      /** 项目根目录 */
      dirname: './',
      /** js 输出地址 */
      jsDest: path.join(DEST_BASE_PATH, yylConfig.dest?.jsPath as string),
      /** html 输出地址 */
      htmlDest: path.join(DEST_BASE_PATH, yylConfig.dest?.htmlPath as string),
      /** css 输出地址 */
      cssDest: path.join(DEST_BASE_PATH, yylConfig.dest?.cssPath as string),
      /** images 输出地址 */
      imagesDest: path.join(DEST_BASE_PATH, yylConfig.dest?.imagesPath as string),
      /** rev-manifest 输出地址 */
      revDest: path.join(DEST_BASE_PATH, yylConfig.dest?.revPath as string),
      basePath: yylConfig.dest?.basePath as string,
      ...yylConfig.alias
    }

    // 初始化处理
    return yylConfig as YylConfig
  }
  return r
}
