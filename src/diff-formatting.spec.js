import {formatForAddition} from './diff-formatting';
import entities from 'entities';

describe('formatForAddition', () => {
  describe('should wrap anything within {+ +} in a span.addition', () => {
    it('when the {+ +} wraps the whole line', () => {
      const line = entities.encodeHTML('{+const a = 1 < 2;+}');

      const result = formatForAddition({line});

      const expected = [
        '<span class="addition">',
        entities.encodeHTML('const a = 1 < 2;'),
        '</span>'
      ].join('');
      expect(result.line).toBe(expected);
    });

    it('when the {+ +} wraps the whole code but prepended with spaces', () => {
      const line = '&nbsp;'.repeat(4) + entities.encodeHTML('{+const a = 1 < 2;+}');

      const result = formatForAddition({line});

      const expected = [
        '&nbsp;'.repeat(4),
        '<span class="addition">',
        entities.encodeHTML('const a = 1 < 2;'),
        '</span>'
      ].join('');
      expect(result.line).toBe(expected);
    });

    it('when the {+ +} wraps a piece of code that is prepended with spaces', () => {
      const line = [
        entities.encodeHTML('{+'),
        '&nbsp;'.repeat(4),
        entities.encodeHTML('const a = 1 < 2;+}')
      ].join('');

      const result = formatForAddition({line});

      const expected = [
        '<span class="addition">',
        '&nbsp;'.repeat(4),
        entities.encodeHTML('const a = 1 < 2;'),
        '</span>'
      ].join('');
      expect(result.line).toBe(expected);
    });
  })
});
