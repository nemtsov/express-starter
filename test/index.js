import requireDirectory from 'require-directory';
requireDirectory(module, '../lib', {exclude: /app\.js$/})
