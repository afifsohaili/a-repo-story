<template>
  <div class="commit-selection">
    <select-commit-button revision-key="revision1" class="select-commit-button">
      {{commit1.text}}
    </select-commit-button>
    <select-commit-button revision-key="revision2" class="select-commit-button">
      {{commit2.text}}
    </select-commit-button>
  </div>
</template>

<script>
import SelectCommitButton from '~/components/SelectCommitButton';

export default {
  components: {SelectCommitButton},
  data() {
    return {
      commit1: {
        text: 'Select commit'
      },
      commit2: {
        text: 'Select commit'
      }
    };
  }
};
</script>

<style scoped>
.commit-selection {
  background: var(--color-white);
  padding: var(--spacing);
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
}

  .select-commit-button:first-child {
    margin-right: var(--spacing);
  }
</style>
