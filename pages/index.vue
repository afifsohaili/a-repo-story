<template>
  <div class="page">
    <commits-selection-pane v-if="!selectionsCollapsed"/>
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
import CommitsSelectionPane from '~/components/CommitsSelectionPane';
import GitDiff from '~/components/GitDiff';

export default {
  components: {
    GitDiff,
    CommitsSelectionPane
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
  right: var(--spacing);
  transition: all 0.3s ease-out;
}

.collapsible.collapsed {
  transform: rotate(180deg);
}

.collapsible:hover {
  background: var(--color-blue-6);
  color: var(--color-white);
}

.page {
  position: relative;
}
</style>
