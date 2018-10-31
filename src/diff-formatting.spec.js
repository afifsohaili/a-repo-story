import entities, {encodeHTML, decodeHTML} from 'entities'
import {processLine} from './diff-formatting'

describe('processLine', () => {
  it('should split addition blocks', () => {
    const line = encodeHTML('{+code+}');

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^<span class="addition">code</span>$'));
  })

  it('should split addition blocks prepended with code block', () => {
    const prependedString = '&nbsp;'.repeat(4);
    const line = prependedString + encodeHTML('{+code+}');

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^' + prependedString));
    expect(result.line).toMatch(new RegExp('<span class="addition">code</span>$'));
  })

  it('should split addition blocks appended with code block', () => {
    const appendedString = '&nbsp;'.repeat(4);
    const line = encodeHTML('{+code+}') + appendedString;

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^<span class="addition">code</span>'));
    expect(result.line.endsWith(appendedString)).toBe(true);
  })

  it('should split deletion blocks', () => {
    const line = encodeHTML('[-code-]');

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^<span class="deletion">code</span>$'));
  })

  it('should split deletion blocks prepended with code blocks', () => {
    const prependedString = '&nbsp;'.repeat(4);
    const line = prependedString + encodeHTML('[-code-]');

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^' + prependedString));
    expect(result.line).toMatch(new RegExp('<span class="deletion">code</span>$'));
  })

  it('should split deletion blocks appended with code blocks', () => {
    const appendedString = '&nbsp;'.repeat(4);
    const line = encodeHTML('[-code-]') + appendedString;

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^<span class="deletion">code</span>'));
    expect(result.line.endsWith(appendedString)).toBe(true);
  })

  it('should split mixed of deletion and addition blocks', () => {
    const line = encodeHTML('[-deleted-]{+added+}')

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^<span class="deletion">deleted</span>'));
    expect(result.line).toMatch(new RegExp('<span class="addition">added</span>$'));
  })

  it('should split mixed of addition and deletion blocks', () => {
    const line = encodeHTML('{+added+}[-deleted-]')

    const result = processLine({line});

    expect(result.line).toMatch(new RegExp('^<span class="addition">added</span>'));
    expect(result.line).toMatch(new RegExp('<span class="deletion">deleted</span>$'));
  })

  it('should split mixed of addition, unmodified, and deletion blocks', () => {
    const added = '{+added+}';
    const unmodified = 'abcd';
    const deleted = '[-deleted-]';
    const line = encodeHTML(`start${added}${unmodified}${deleted}end`)

    const result = processLine({line});

    expect(result.line.startsWith('start')).toBe(true);
    expect(result.line).toMatch(`<span class="addition">added</span>`);
    expect(result.line).toMatch(unmodified);
    expect(result.line).toMatch(`<span class="deletion">deleted</span>`);
    expect(result.line.endsWith('end')).toBe(true);
  })

  it('should return back the rest of the props', () => {
    const line = encodeHTML('{+code+}');
    const result = processLine({line, a: 1, b: 2});

    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  })

  it('should return addition: true if there is addition to the line', () => {
    const line = encodeHTML('{+code+}');
    const result = processLine({line});

    expect(result.addition).toBe(true);
  })

  it('should return addition: false if there is only deletion to the line', () => {
    const line = encodeHTML('[-code-]');
    const result = processLine({line});

    expect(result.addition).toBe(false);
  })

  it('should return addition: true if there are deletion and addition to the line', () => {
    const line = encodeHTML('{+added+}[-deleted-]');
    const result = processLine({line});

    expect(result.addition).toBe(true);
  })
})
