import fs from 'fs';
import path from 'path';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const LOG_DIR = path.join(process.cwd(), 'logs');

if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

function write(level: LogLevel, message: string, meta?: unknown) {
  const now = new Date().toISOString();

  const log = `[${now}] [${level}] ${message}${meta ? ' ' + JSON.stringify(meta) : ''}`;

  // Console
  console.log(log);

  // File
  fs.appendFileSync(path.join(LOG_DIR, 'app.log'), log + '\n');

  if (level === 'ERROR') {
    fs.appendFileSync(path.join(LOG_DIR, 'error.log'), log + '\n');
  }
}

export const logger = {
  debug(message: string, meta?: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      write('DEBUG', message, meta);
    }
  },

  info(message: string, meta?: unknown) {
    write('INFO', message, meta);
  },

  warn(message: string, meta?: unknown) {
    write('WARN', message, meta);
  },

  error(message: string, meta?: unknown) {
    write('ERROR', message, meta);
  },
};
