import {formatForAddition} from './diff-formatting';
import entities from 'entities';

describe('formatForAddition', () => {
  describe('should wrap anything within {+ +} in a span.addition', () => {
    it('when the {+ +} wraps the whole line', () => {
      const line = '{+const a = 1 < 2;+}abc';

      const result = formatForAddition({line});

      const expected = [
        '<div class="addition">',
        entities.encodeHTML('const a = 1 < 2;'),
        '</div>'
      ].join('');
      expect(result.line).toBe(expected);
    })
  })
});
