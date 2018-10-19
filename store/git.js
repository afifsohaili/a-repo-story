import Vue from 'vue';

export const state = () => ({
  revision1: undefined,
  revision2: undefined
});

export const mutations = {
  setRevision: (state, {key, revision}) => {
    Vue.set(state, key, revision);
  }
};
