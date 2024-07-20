#! /usr/bin/env node

import {
  BufferStream
} from 'bufferstreams';
import ttf2woff2 from '../dist/index.js';

process.stdin
  .pipe(
    new BufferStream(function (err, buf, cb) {
      if (err) {
        throw err;
      }
      cb(null, ttf2woff2(buf));
    }),
  )
  .pipe(process.stdout);
