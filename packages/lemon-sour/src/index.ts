import * as childProcess from 'child_process';
import { cli } from '@lemon-sour/cli';
import { CliArgsInterface } from '@lemon-sour/cli';
import { lemonSour } from './lemon-sour';

/**
 * bootstrap
 */
const args: CliArgsInterface = cli();
lemonSour.run(args).catch(e => {
  console.error(e);
});
