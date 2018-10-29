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
    })
  })
});
