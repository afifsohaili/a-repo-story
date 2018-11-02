<template>
  <div class="commit-selection">
    <select-commit-button revision-key="revision1" class="select-commit-button">
      Select commit #1
    </select-commit-button>
    <select-commit-button revision-key="revision2" class="select-commit-button">
      Select commit #2
    </select-commit-button>
    <button
      class="collapsible"
      :class="collapsed && 'collapsed'"
      @click.prevent="collapseSelection">
      <i class="icon-up-open" :class="collapsed && 'collapsed'"></i>
    </button>
  </div>
</template>

<script>
import SelectCommitButton from '~/components/SelectCommitButton';

export default {
  components: {SelectCommitButton},
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    collapseSelection() {
      this.collapsed = !this.collapsed;
    }
  }
};
</script>

<style scoped>
.commit-selection {
  align-items: center;
  background: var(--color-white);
  display: flex;
  justify-content: center;
  padding: var(--spacing);
  position: fixed;
  top: 0;
  width: 100%;
}

.select-commit-button:first-child {
  margin-right: var(--spacing);
}

.collapsible {
  background: var(--color-light-gray-2);
  border-radius: 100%;
  border: 0 none;
  cursor: pointer;
  padding: var(--spacing);
  position: absolute;
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
</style>
