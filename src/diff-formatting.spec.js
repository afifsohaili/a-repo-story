import entities, {encodeHTML, decodeHTML} from 'entities'
import {
  formatForAddition,
  formatForDeletion,
  splitTokens
} from './diff-formatting'

describe.only('splitTokens', () => {
  it('should split addition blocks', () => {
    const line = encodeHTML('{+code+}');

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^<span class="addition">code</span>$'));
  })

  it('should split addition blocks prepended with code block', () => {
    const prependedString = '&nbsp;'.repeat(4);
    const line = prependedString + encodeHTML('{+code+}');

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^' + prependedString));
    expect(result.line).toMatch(new RegExp('<span class="addition">code</span>$'));
  })

  it('should split addition blocks appended with code block', () => {
    const appendedString = '&nbsp;'.repeat(4);
    const line = encodeHTML('{+code+}') + appendedString;

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^<span class="addition">code</span>'));
    expect(result.line.endsWith(appendedString)).toBe(true);
  })

  it('should split deletion blocks', () => {
    const line = encodeHTML('[-code-]');

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^<span class="deletion">code</span>$'));
  })

  // TODO: better description
  it('should split deletion blocks prepended with code blocks', () => {
    const prependedString = '&nbsp;'.repeat(4);
    const line = prependedString + encodeHTML('[-code-]');

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^' + prependedString));
    expect(result.line).toMatch(new RegExp('<span class="deletion">code</span>$'));
  })

  // TODO: better description
  it('should split deletion blocks appended with code blocks', () => {
    const appendedString = '&nbsp;'.repeat(4);
    const line = encodeHTML('[-code-]') + appendedString;

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^<span class="deletion">code</span>'));
    expect(result.line.endsWith(appendedString)).toBe(true);
  })

  it('should split mixed of deletion and addition blocks', () => {
    const line = encodeHTML('[-deleted-]{+added+}')

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^<span class="deletion">deleted</span>'));
    expect(result.line).toMatch(new RegExp('<span class="addition">added</span>$'));
  })

  it('should split mixed of addition and deletion blocks', () => {
    const line = encodeHTML('{+added+}[-deleted-]')

    const result = splitTokens({line});

    expect(result.line).toMatch(new RegExp('^<span class="addition">added</span>'));
    expect(result.line).toMatch(new RegExp('<span class="deletion">deleted</span>$'));
  })

  it('should split mixed of addition, unmodified, and deletion blocks', () => {
    const added = '{+added+}';
    const unmodified = 'abcd';
    const deleted = '[-deleted-]';
    const line = encodeHTML(`start${added}${unmodified}${deleted}end`)

    const result = splitTokens({line});
    console.log('\n', 'result.line', result.line);

    expect(result.line.startsWith('start')).toBe(true);
    expect(result.line).toMatch(`<span class="addition">added</span>`);
    expect(result.line).toMatch(unmodified);
    expect(result.line).toMatch(`<span class="deletion">deleted</span>`);
    expect(result.line.endsWith('end')).toBe(true);
  })
})
