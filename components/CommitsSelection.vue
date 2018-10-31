<template>
  <div class="commit-selection">
    <button class="selector">
      {{commit1.text}}
    </button>
    <button class="selector">
      {{commit2.text}}
    </button>
  </div>
</template>

<script>
import fuzzy from 'fuzzysort';

console.log('\n', 'fuzzy', fuzzy);

export default {
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

.selector {
  border-radius: var(--border-radius-l);
  border: 1px solid var(--color-primary);
  cursor: pointer;
  font-size: 14px;
  padding: var(--spacing);
  padding-right: calc(var(--spacing) * 3);
  position: relative;
}

.selector::after {
  border-color: #007bff transparent transparent transparent;
  border-style: solid;
  border-width: 6.1px 3.5px 0 3.5px;
  content: " ";
  height: 0;
  position: absolute;
  right: calc(var(--spacing));
  top: calc(50% - 3px);
  width: 0;
}
</style>
