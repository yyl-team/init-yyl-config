import { YylConfig, Env, YylConfigEntry, DestConfig, LocalserverConfig, ProxyConfig, CommitConfig } from 'yyl-config-types';
export interface InitYylConfigMergeProps {
    /** yylconfig */
    yylConfig: YylConfig;
    /** env */
    env: Env;
}
/** 更改 yylConfig 操作函数 */
export declare type InitYylConfigMerge = (props: InitYylConfigMergeProps) => YylConfig;
/** 项目信息 */
export interface ProjectInfo {
    /** 项目名称 */
    name: Required<YylConfig>['name'];
    /** seed 类型 */
    workflow?: Required<YylConfig>['workflow'];
    /** seed 二级类型 */
    seed?: Required<YylConfig>['seed'];
    /** 开发平台 */
    platform?: Required<YylConfig>['platform'];
    /** 要求 yyl 最低版本 */
    yylVersion?: Required<YylConfig>['version'];
    /** 项目源文件目录 */
    srcRoot?: string;
    /** 是否使用 yarn */
    yarn?: YylConfig['yarn'];
}
export interface InitYylConfigOption {
    /** 项目信息 */
    projectInfo: ProjectInfo;
    /** 输出配置 */
    dest?: DestConfig;
    /** 本地服务配置 */
    localserver?: LocalserverConfig;
    /** 反向代理配置 */
    proxy?: ProxyConfig;
    /** 发布配置 */
    commit?: {
        revAddr?: string;
        hostname?: string;
    };
    /** yyl 配置变更 */
    merge?: InitYylConfigMerge;
}
/** 默认项目配置 */
export declare const DEFAULT_PROJECT_INFO: Required<ProjectInfo>;
/** 默认服务器配置 */
export declare const DEFAULR_LOCAL_SEVER_CONFIG: LocalserverConfig;
/** 默认反向代理配置 */
export declare const DEFAULT_PROXY_CONFIG: ProxyConfig;
/** 默认 输出 配置 */
export declare const DEFAULT_DEST_CONFIG: DestConfig;
export declare const DEFAULT_COMMIT: CommitConfig;
/** 初始化 yyl.config */
export declare function initYylConfig(option: InitYylConfigOption): YylConfigEntry;
