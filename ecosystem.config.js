module.exports = {
  apps: [
    {
      name: 'companion-for-ts',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs',
    },
  ],
};
