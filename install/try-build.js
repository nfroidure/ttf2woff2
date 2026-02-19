import { execSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

let output = '';

try {
  output = execSync('node-gyp configure && node-gyp build 2>&1', {
    encoding: 'utf8',
  });
} catch (err) {
  output = err?.stdout || err?.stderr || err?.message || '';
}

writeFileSync('builderror.log', output);
