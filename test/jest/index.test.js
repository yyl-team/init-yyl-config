const { TestScheduler } = require('jest')
const { initYylConfig } = require('../../')

test('usage test', () => {
  const rFn = initYylConfig(() => {
    return {
      name: 'projectname',
      workflow: 'webpack',
      platform: 'pc',
      version: '1.0.0',
      yarn: true
    }
  })
  expect(rFn({ env: {} })).toEqual({
    name: 'projectname',
    workflow: 'webpack',
    platform: 'pc',
    version: '1.0.0',
    yarn: true,
    alias: {
      basePath: '/',
      cssDest: 'dist/css',
      destRoot: './dist',
      dirname: './',
      htmlDest: 'dist/html',
      imagesDest: 'dist/image',
      jsDest: 'dist/js',
      revDest: 'dist/assets',
      revRoot: 'dist/',
      root: 'dist/',
      srcRoot: './src'
    },
    commit: {
      hostname: '/',
      revAddr: '/assets'
    },
    dest: {
      basePath: '/',
      cssPath: 'css',
      htmlPath: 'html',
      imagesPath: 'image',
      jsPath: 'js',
      revPath: 'assets'
    },
    localserver: {
      port: 5000,
      root: './dist'
    },
    proxy: {
      localRemote: {},
      port: 8887
    },
    px2rem: false,
    seed: 'base'
  })
})
