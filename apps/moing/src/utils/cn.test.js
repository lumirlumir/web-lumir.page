import { describe, it } from 'node:test';
import { strictEqual } from 'node:assert';
import cn from './cn.js';

/* eslint-disable no-constant-binary-expression -- Test */

describe('cn', () => {
  it('strings', () => {
    strictEqual(cn(''), '');
    strictEqual(cn('foo'), 'foo');
    strictEqual(cn(true && 'foo'), 'foo');
    strictEqual(cn(false && 'foo'), '');
  });

  it('strings (variadic)', () => {
    strictEqual(cn(''), '');
    strictEqual(cn('foo', 'bar'), 'foo bar');
    strictEqual(cn(true && 'foo', false && 'bar', 'baz'), 'foo baz');
    strictEqual(cn(false && 'foo', 'bar', 'baz', ''), 'bar baz');
  });

  it('empties', () => {
    strictEqual(cn(''), '');
    strictEqual(cn(undefined), '');
    strictEqual(cn(null), '');
    strictEqual(cn(0), '');
  });

  // Ignores all non-strings
  it('non-strings', () => {
    // number
    strictEqual(cn(1), '');
    strictEqual(cn(1, 2), '');
    strictEqual(cn(Infinity), '');
    strictEqual(cn(NaN), '');
    strictEqual(cn(0), '');

    // objects
    strictEqual(cn({}), '');
    strictEqual(cn(null), '');
    strictEqual(cn({ a: 1 }), '');
    strictEqual(cn({ a: 1 }, { b: 2 }), '');

    // arrays
    strictEqual(cn([]), '');
    strictEqual(cn(['foo']), '');
    strictEqual(cn(['foo', 'bar']), '');

    // functions
    strictEqual(
      cn(() => {}),
      '',
    );
    strictEqual(
      cn(() => {}),
      '',
    );
  });
});
