import { YError, printStackTrace } from 'yerror';
import debug from 'debug';
import { env } from 'node:process';
import bindings from 'bindings'
import ttf2woff2Loader from '../jssrc/index.js';

const doDebug = debug('ttf2woff2');
const ttf2woff2 = getExecutable();

function getExecutable() {
  if (!env.TTF2WOFF2_VERSION || env.TTF2WOFF2_VERSION?.toLowerCase() === 'native') {
    try {
      doDebug('✅ Using native version.');
      return bindings.default('addon.node').convert;
    } catch (err) {
      doDebug('❌ Could not load the native version.', printStackTrace(err as Error));
    }
  }

  if (!env.TTF2WOFF2_VERSION || env.TTF2WOFF2_VERSION?.toLowerCase() === 'wasm') {
    try {
      doDebug('✅ Using WASM version.');
      return ttf2woff2Loader;
    } catch (err) {
      doDebug('❌ Could not load the WASM version.', printStackTrace(err as Error));
    }
  }

  throw new YError('E_UNABLE_TO_LOAD_TTF2WOFF2', env.TTF2WOFF2_VERSION);
}

export default ttf2woff2 as NonNullable<typeof ttf2woff2>;
