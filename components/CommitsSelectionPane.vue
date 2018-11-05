<template>
  <div class="commit-selection">
    <select-commit-button revision-key="revision1" class="select-commit-button">
      Select commit #1
    </select-commit-button>
    <select-commit-button revision-key="revision2" class="select-commit-button">
      Select commit #2
    </select-commit-button>
  </div>
</template>

<script>
import SelectCommitButton from '~/components/SelectCommitButton';

export default {
  components: {SelectCommitButton},
  computed: {
    collapsed() {
      return this.$store.state['commits-selection'].collapsed;
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
  max-height: 80px;
}

.select-commit-button:first-child {
  margin-right: var(--spacing);
}
</style>
