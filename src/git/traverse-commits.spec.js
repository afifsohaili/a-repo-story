/* globals describe, it, expect */
import chance from '~/test/chance';
import {getNextCommit, getPreviousCommit} from '~/src/git/traverse-commits';

const createCommit = (hash = chance.string({length: 5})) => ({hash});

describe('getNextCommit', () => {
  describe('singleRevision', function () {
    it('should get the next commit in the array if there is', function () {
      const currentRevision = createCommit();
      const nextCommit = createCommit();
      const commits = [
        createCommit(),
        nextCommit, // Since sort order is reversed in git log, a next commit appears first in the array
        currentRevision,
        createCommit()
      ];

      expect(getNextCommit(currentRevision.hash, chance.word(), commits)).toHaveProperty('hash', nextCommit.hash);
    });

    it('should return itself if there is no more next commit', function () {
      const currentRevision = createCommit();
      const commits = [
        currentRevision,
        createCommit(),
        createCommit()
      ];

      expect(getNextCommit(currentRevision.hash, chance.word(), commits)).toHaveProperty('hash', currentRevision.hash);
    });
  });
});

describe('getPreviousCommit', () => {
  describe('singleRevision', function () {
    it('should get the previous commit in the array if there is', function () {
      const currentRevision = createCommit();
      const previousCommit = createCommit();
      const commits = [
        createCommit(),
        createCommit(),
        currentRevision,
        previousCommit // Since sort order is reversed in git log, a previous commit appears last in the array
      ];

      expect(getPreviousCommit(currentRevision.hash, chance.word(), commits)).toHaveProperty('hash', previousCommit.hash);
    });

    it('should return itself if there is no more previous commit', function () {
      const currentRevision = createCommit();
      const commits = [
        createCommit(),
        createCommit(),
        currentRevision
      ];

      expect(getPreviousCommit(currentRevision.hash, chance.word(), commits)).toHaveProperty('hash', currentRevision.hash);
    });
  });
});
