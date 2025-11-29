module.exports = {
  apps: [
    {
      name: 'atelieral',
      cwd: './',
      script: '.vercel/output/functions/_render.func/dist/server/entry.mjs',
      interpreter: 'node',
      args: '--port=3000 --host=0.0.0.0',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        HOST: '0.0.0.0',
        ASTRO_TELEMETRY_DISABLED: '1'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};


