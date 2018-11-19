import Vue from 'vue';
import gitLogService from '~/src/git/log';

export const state = () => ({
  revision1: undefined,
  revision2: undefined,
  commits: [],
  error: ''
});

export const mutations = {
  setMultiRevision(state, newRevision) {
    const {revision1} = state;
    if (!revision1) {
      Vue.set(state, 'revision1', newRevision);
      return;
    }
    const indexRevision1 = state.commits.findIndex(({hash}) => hash === revision1);
    const indexNewRevision = state.commits.findIndex(({hash}) => hash === newRevision);
    if (indexNewRevision > -1 && indexRevision1 > indexNewRevision) {
      Vue.set(state, 'revision1', newRevision);
      Vue.set(state, 'revision2', revision1);
      return;
    }
    Vue.set(state, 'revision2', newRevision);
  },
  setSingleRevision(state, newRevision) {
    Vue.set(state, 'revision1', newRevision);
    Vue.set(state, 'revision2', undefined);
  },
  setCommits(state, gitCommits) {
    Vue.set(state, 'commits', gitCommits);
  }
};

export const actions = {
  async getLogs({commit}, git) {
    try {
      const gitCommits = await gitLogService(git).getAllLogs();
      commit('setCommits', gitCommits);
    } catch (e) {
      this.error = e.message;
    }
  }
};
