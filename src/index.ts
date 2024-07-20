let ttf2woff2: (input: Buffer) => Buffer;

try {
  ttf2woff2 = (await import('bindings'))('addon.node').convert;
} catch (err) {
  ttf2woff2 = (await import('../jssrc/index.js')).default;
}

export default ttf2woff2;
