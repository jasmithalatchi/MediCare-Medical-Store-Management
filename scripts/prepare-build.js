import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const frontendDist = path.join(rootDir, 'frontend', 'dist');
const rootDist = path.join(rootDir, 'dist');

const serverContentFrontendDist = `import app from '../../backend/server.js';
export default app;
`;

const serverContentRootDist = `import app from '../backend/server.js';
export default app;
`;

// Helper to copy dir recursively
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 1. Ensure frontend/dist has backend entrypoints
if (fs.existsSync(frontendDist)) {
  fs.writeFileSync(path.join(frontendDist, 'server.js'), serverContentFrontendDist, 'utf8');
  fs.writeFileSync(path.join(frontendDist, 'index.js'), serverContentFrontendDist, 'utf8');
  fs.writeFileSync(path.join(frontendDist, 'app.js'), serverContentFrontendDist, 'utf8');
  console.log('[prepare-build] Injected server entrypoints into frontend/dist');

  // 2. Mirror frontend/dist to root dist
  try {
    copyDirSync(frontendDist, rootDist);
    fs.writeFileSync(path.join(rootDist, 'server.js'), serverContentRootDist, 'utf8');
    fs.writeFileSync(path.join(rootDist, 'index.js'), serverContentRootDist, 'utf8');
    fs.writeFileSync(path.join(rootDist, 'app.js'), serverContentRootDist, 'utf8');
    console.log('[prepare-build] Mirrored build to root dist with server entrypoints');
  } catch (err) {
    console.warn('[prepare-build] Warning mirroring to root dist:', err.message);
  }
}

console.log('[prepare-build] Build preparation complete.');
