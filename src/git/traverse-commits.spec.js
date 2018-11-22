/* globals describe, it, expect */
import chance from '~/test/chance';
import {getNextCommit, getPreviousCommit} from '~/src/git/traverse-commits';

const createCommit = (hash = chance.string({length: 5})) => ({hash});

describe('traverse-commits', function () {
  describe('getNextCommit', () => {
    describe('singleRevision', function () {
      it('should get the next commit in the array when there is', function () {
        const revision1 = createCommit();
        const nextCommit = createCommit();
        const commits = [
          createCommit(),
          nextCommit, // Since sort order is reversed in git log, a next commit appears first in the array
          revision1,
          createCommit()
        ];

        expect(getNextCommit(revision1.hash, chance.word(), commits)).toHaveProperty('hash', nextCommit.hash);
      });

      it('should return itself when there is no more next commit', function () {
        const revision1 = createCommit();
        const commits = [
          revision1,
          createCommit(),
          createCommit()
        ];

        expect(getNextCommit(revision1.hash, chance.word(), commits)).toHaveProperty('hash', revision1.hash);
      });
    });

    describe('multiRevision', function () {
      it('should get the next commit in the range when the next commit after revision2 is not revision1', function () {
        const revision1 = createCommit();
        const revision2 = createCommit();
        const nextCommit = createCommit();
        const commits = [
          createCommit(),
          revision1,
          ...chance.n(createCommit, chance.natural({min: 0, max: 10})),
          nextCommit,
          revision2,
          createCommit()
        ];

        expect(getNextCommit(revision1.hash, revision2.hash, commits)).toHaveProperty('hash', nextCommit.hash);
      });

      it('should return back revision1 in the range when the next commit after revision2 is revision1', function () {
        const revision1 = createCommit();
        const revision2 = createCommit();
        const commits = [
          createCommit(),
          revision1,
          revision2,
          createCommit()
        ];

        expect(getNextCommit(revision1.hash, revision2.hash, commits)).toHaveProperty('hash', revision1.hash);
      });
    });
  });

  describe('getPreviousCommit', () => {
    describe('singleRevision', function () {
      it('should get the previous commit in the array when there is', function () {
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

      it('should return itself when there is no more previous commit', function () {
        const currentRevision = createCommit();
        const commits = [
          createCommit(),
          createCommit(),
          currentRevision
        ];

        expect(getPreviousCommit(currentRevision.hash, chance.word(), commits)).toHaveProperty('hash', currentRevision.hash);
      });
    });

    describe('multiRevision', function () {
      it('should extend the commit range when there is still a previous commit', function () {
        const revision1 = createCommit();
        const revision2 = createCommit();
        const previousCommit = createCommit();
        const commits = [
          revision1,
          revision2,
          previousCommit
        ];

        expect(getPreviousCommit(revision1.hash, revision2.hash, commits)).toHaveProperty('hash', previousCommit.hash);
      });

      it('should not extend the commit range when there is no previous commit', function () {
        const revision1 = createCommit();
        const revision2 = createCommit();
        const commits = [
          revision1,
          revision2
        ];

        expect(getPreviousCommit(revision1.hash, revision2.hash, commits)).toHaveProperty('hash', revision2.hash);
      });
    });
  });
});
