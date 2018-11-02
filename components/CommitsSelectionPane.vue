<template>
  <div class="commit-selection">
    <select-commit-button revision-key="revision1">
      {{commit1.text}}
    </select-commit-button>
    <select-commit-button revision-key="revision2">
      {{commit2.text}}
    </select-commit-button>
  </div>
</template>

<script>
import fuzzy from 'fuzzysort';
import SelectCommitButton from '~/components/SelectCommitButton';

console.log('\n', 'fuzzy', fuzzy);

export default {
  components: {SelectCommitButton},
  data() {
    return {
      commit1: {
        text: 'Commit #1'
      },
      commit2: {
        text: 'Commit #2'
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
  justify-content: space-between;
}
</style>
