import { YylConfig, Env, DestConfig, LocalserverConfig, ProxyConfig, CommitConfig, YylConfigEntryFn } from 'yyl-config-types';
export * from 'yyl-config-types';
export interface InitYylConfigFunctionProps {
    env: Env;
}
export interface NiceYylConfig extends Omit<YylConfig, 'commit' | 'alias'> {
    alias?: {
        [key: string]: string;
    };
    commit: {
        revAddr?: string;
        hostname: string;
        staticHost?: string;
        mainHost?: string;
    };
}
export declare type InitYylConfigCallback = (props: InitYylConfigFunctionProps) => NiceYylConfig;
/** 默认项目配置 */
export declare const DEFAULT_PROJECT_INFO: Required<Pick<YylConfig, 'name' | 'workflow' | 'platform' | 'version' | 'yarn' | 'seed'>>;
/** 默认服务器配置 */
export declare const DEFAULT_LOCAL_SEVER_CONFIG: LocalserverConfig;
/** 默认反向代理配置 */
export declare const DEFAULT_PROXY_CONFIG: ProxyConfig;
/** 默认 输出 配置 */
export declare const DEFAULT_DEST_CONFIG: DestConfig;
export declare const DEFAULT_COMMIT_CONFIG: CommitConfig;
/** 初始化 yyl.config */
export declare function initYylConfig(fn: InitYylConfigCallback): YylConfigEntryFn;
