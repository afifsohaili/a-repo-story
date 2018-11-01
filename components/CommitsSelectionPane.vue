<template>
  <div class="commit-selection">
    <commits-selection>
      {{commit1.text}}
    </commits-selection>
    <commits-selection>
      {{commit2.text}}
    </commits-selection>
  </div>
</template>

<script>
import fuzzy from 'fuzzysort';
import CommitsSelection from '~/components/CommitsSelection';

console.log('\n', 'fuzzy', fuzzy);

export default {
  components: {CommitsSelection},
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
}
</style>
