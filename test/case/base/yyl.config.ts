import { initYylConfig, NiceYylConfig } from '../../../'
import pkg from './package.json'

// + vars
const PROJECT_NAME = pkg.name
const WORKFLOW = 'webpack'
const PLATFORM = 'pc'
const VERSION = '4.0.0'
const SRC_ROOT = './src'
const USE_YARN = true
// - vars

const hostname = 'www.yourhost.com'
const staticHost = 'wwww.yourhost.com'
module.exports = initYylConfig(({ env }) => {
  const yylConfig: NiceYylConfig = {
    name: PROJECT_NAME,
    workflow: WORKFLOW,
    platform: PLATFORM,
    version: VERSION,
    yarn: USE_YARN,
    dest: {
      basePath: `/project/${PROJECT_NAME}/${PLATFORM}`,
      jsPath: 'js',
      cssPath: 'css',
      htmlPath: 'html',
      imagesPath: 'images',
      revPath: 'asset'
    },
    proxy: {
      homePage: `http://${hostname}/web/${PROJECT_NAME}/`,
      localRemote: (() => {
        const r = {}
        r[
          `http://${hostname}/web/${PROJECT_NAME}`
        ] = `http://127.0.0.1:5000/project/${PROJECT_NAME}/${PLATFORM}/html`
        return r
      })()
    },
    alias: {
      srcRoot: SRC_ROOT
    },
    commit: {
      hostname: `//${staticHost}`,
      revAddr: `http://${staticHost}/project/${PROJECT_NAME}/${PLATFORM}/assets/rev-manifest.json`
    }
  }

  return yylConfig
})
