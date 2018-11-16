import Vue from 'vue';
import gitLogService from '~/src/git/log';

export const state = () => ({
  revision1: undefined,
  revision2: undefined,
  commits: [],
  error: ''
});

export const mutations = {
  setRevision(state, {key, revision}) {
    Vue.set(state, key, revision);
  },
  setCommits(state, gitCommits) {
    Vue.set(state, 'commits', gitCommits);
  }
};

export const actions = {
  async getLogs({commit}, git) {
    console.log('\n', 'Vue', Vue);
    try {
      const gitCommits = await gitLogService(git).getAllLogs();
      commit('setCommits', gitCommits);
    } catch (e) {
      console.error('\n', 'e', e);
      this.error = e.message;
    }
  }
};
