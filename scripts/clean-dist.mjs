import { rmSync } from 'node:fs';
import path from 'node:path';

const workspace = process.cwd();
const target = path.resolve(workspace, 'dist');
if (target !== path.join(workspace, 'dist')) {
  throw new Error(`Refusing to clean unexpected build path: ${target}`);
}

rmSync(target, { recursive: true, force: true });
