<template>
  <div class="page">
    <commits-sidebar v-show="!selectionsCollapsed"/>
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
import CommitsSidebar from '~/components/CommitsSidebar';
import GitDiff from '~/components/GitDiff';

export default {
  components: {
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
  }
};
</script>

<style scoped>
.collapsible {
  top: var(--spacing);
  background: var(--color-light-gray-2);
  border-radius: 100%;
  border: 0 none;
  cursor: pointer;
  padding: var(--spacing);
  position: fixed;
  left: calc(60% + var(--spacing));
  transition: all 0.3s ease-out;
  transform: rotate(90deg);
}

.collapsible.collapsed {
  transform: rotate(270deg);
  left: var(--spacing);
}

.collapsible:hover {
  background: var(--color-blue-6);
  color: var(--color-white);
}

.page {
  position: relative;
}
</style>
