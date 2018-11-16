<template>
  <div class="page">
    <commits-sidebar v-show="!selectionsCollapsed"/>
    <commits-controls/>
    <git-diff class="diff" />
    <button
      class="collapsible"
      :class="selectionsCollapsed && 'collapsed'"
      @click.prevent="collapseSelection">
      <i class="icon-up-open" :class="selectionsCollapsed && 'collapsed'"></i>
    </button>
  </div>
</template>

<script>
import CommitsControls from '~/components/CommitsControls';
import CommitsSidebar from '~/components/CommitsSidebar';
import GitDiff from '~/components/GitDiff';

export default {
  components: {
    CommitsControls,
    CommitsSidebar,
    GitDiff
  },
  computed: {
    selectionsCollapsed() {
      return this.$store.state['commits-selection'].collapsed;
    }
  },
  methods: {
    collapseSelection() {
      const currentState = this.$store.state['commits-selection'].collapsed;
      this.$store.commit('commits-selection/collapseSelection', !currentState);
    }
  },
  async mounted() {
    await this.$store.dispatch('git/getLogs', this.$git);
  }
};
</script>

<style scoped>
.collapsible {
  background: var(--color-light-gray-2);
  border-radius: 100%;
  border: 0 none;
  cursor: pointer;
  left: calc(60% + var(--spacing));
  padding: var(--spacing);
  position: fixed;
  top: var(--spacing);
  transform: rotate(-90deg);
  transition: all 0.3s ease-out;
}

.collapsible.collapsed {
  left: var(--spacing);
  transform: rotate(90deg);
}

.collapsible:hover {
  background: var(--color-blue-6);
  color: var(--color-white);
}

.page {
  position: relative;
}
</style>
