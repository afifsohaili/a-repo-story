/* globals describe, it, expect */
import {mutations} from './git';
import chance from '../test/chance';

const createCommit = hash => {
  return {hash: hash ? hash : chance.string({length: 5})};
};

describe('mutations', () => {
  describe('setSingleRevision', function () {
    it('should set only revision1 when revision1 and revision2 are undefined', function () {
      const emptyState = {revision1: undefined, revision2: undefined};
      const newRevision = chance.string({length: 5});
      mutations.setSingleRevision(emptyState, newRevision);
      expect(emptyState.revision1).toBe(newRevision);
      expect(emptyState.revision2).toBe(undefined);
    });

    it('should set only revision1 when revision1 is set and revision2 is undefined', function () {
      const emptyState = {revision1: chance.string({length: 5}), revision2: undefined};
      const newRevision = chance.string({length: 5});
      mutations.setSingleRevision(emptyState, newRevision);
      expect(emptyState.revision1).toBe(newRevision);
      expect(emptyState.revision2).toBe(undefined);
    });

    it('should set revision1 and unset revision2 when revision1 and revision2 are set', function () {
      const emptyState = {revision1: chance.string({length: 5}), revision2: chance.string({length: 5})};
      const newRevision = chance.string({length: 5});
      mutations.setSingleRevision(emptyState, newRevision);
      expect(emptyState.revision1).toBe(newRevision);
      expect(emptyState.revision2).toBe(undefined);
    });
  });

  describe('setMultiRevision', function () {
    it('should add to revision1 when both unset', function () {
      const emptyState = {revision1: undefined, revision2: undefined};
      const newRevision = chance.string({length: 5});
      mutations.setMultiRevision(emptyState, newRevision);
      expect(emptyState.revision1).toBe(newRevision);
      expect(emptyState.revision2).toBe(undefined);
    });

    it('should add to revision2 when revision1 is set but revision2 unset', function () {
      const revision1 = chance.string({length: 5});
      const state = {revision1, revision2: undefined, commits: []};
      const newRevision = chance.string({length: 5});
      mutations.setMultiRevision(state, newRevision);
      expect(state.revision1).toBe(revision1);
      expect(state.revision2).toBe(newRevision);
    });

    it('should add to revision2 and retain revision1 when both are set', function () {
      const revision1 = chance.string({length: 5});
      const state = {
        revision1,
        revision2: chance.string({length: 5}),
        commits: []
      };
      const newRevision = chance.string({length: 5});
      mutations.setMultiRevision(state, newRevision);
      expect(state.revision1).toBe(revision1);
      expect(state.revision2).toBe(newRevision);
    });

    it('should set revision1 and revision2 when revision1 is a commit that comes earlier', function () {
      const revision1 = 'rev1';
      const newRevision = 'newrev';
      const state = {
        revision1,
        revision2: undefined,
        commits: [
          createCommit(revision1),
          createCommit(chance.string({length: 5})),
          createCommit(chance.string({length: 5})),
          createCommit(newRevision)
        ]
      };
      mutations.setMultiRevision(state, newRevision);
      expect(state.revision1).toBe(revision1);
      expect(state.revision2).toBe(newRevision);
    });
  });

  it('should swap revision1 and revision2 when revision2 is a commit that comes earlier', function () {
    const revision1 = 'rev1';
    const newRevision = 'newrev';
    const state = {
      revision1,
      revision2: undefined,
      commits: [
        createCommit(newRevision),
        createCommit(chance.string({length: 5})),
        createCommit(chance.string({length: 5})),
        createCommit(revision1)
      ]
    };
    mutations.setMultiRevision(state, newRevision);
    expect(state.revision1).toBe(newRevision);
    expect(state.revision2).toBe(revision1);
  });
});
