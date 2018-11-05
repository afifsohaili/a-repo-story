import Vue from 'vue';

export const state = () => ({
  collapsed: false
});

export const mutations = {
  collapseSelection: (state, newState) => {
    Vue.set(state, 'collapsed', newState);
  }
};
