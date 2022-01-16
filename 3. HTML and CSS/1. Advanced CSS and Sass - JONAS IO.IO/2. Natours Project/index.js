/*jshint esversion: 11*/
/* eslint-env es12 */

'use strict';

import sass from 'sass';
import { promisify } from 'util';
import { writeFile } from 'fs';
const sassRenderPromise = promisify(sass.render);
const writeFilePromise = promisify(writeFile);

async function main() {
  const styleResult = await sassRenderPromise({
    file: `${process.cwd()}/sass/main.scss`,
    outFile: `${process.cwd()}/css/main.css`,
    sourceMap: true,
    sourceMapContents: true,
    // outputStyle: 'compressed',
  });

  console.log(styleResult.css.toString());

  await writeFilePromise('css/main.css', styleResult.css, 'utf8');

  await writeFilePromise('css/main.css.map', styleResult.map, 'utf8');
}
main();
