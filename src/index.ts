import { YError, printStackTrace } from 'yerror';
import debug from 'debug';
import { env } from 'node:process';

const doDebug = debug('ttf2woff2');
let ttf2woff2: undefined | ((input: Buffer) => Buffer) = undefined;

if (
  !env.TTF2WOFF2_VERSION ||
  env.TTF2WOFF2_VERSION?.toLowerCase() === 'native'
) {
  try {
    ttf2woff2 = (await import('bindings')).default('addon.node').convert;
    doDebug('✅ Using native version.');
  } catch (err) {
    doDebug(
      '❌ Could not load the native version.',
      printStackTrace(err as Error),
    );
  }
}

if (!env.TTF2WOFF2_VERSION || env.TTF2WOFF2_VERSION?.toLowerCase() === 'wasm') {
  if (!ttf2woff2) {
    try {
      ttf2woff2 = (await import('../jssrc/index.js')).default;
      doDebug('✅ Using WASM version.');
    } catch (err) {
      doDebug(
        '❌ Could not load the WASM version.',
        printStackTrace(err as Error),
      );
    }
  }
}

if (!ttf2woff2) {
  throw new YError('E_UNABLE_TO_LOAD_TTF2WOFF2', env.TTF2WOFF2_VERSION);
}

export default ttf2woff2 as NonNullable<typeof ttf2woff2>;
