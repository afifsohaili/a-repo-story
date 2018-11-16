<template>
  <div
    class="commit"
    :class="isSelected && 'selected'"
    :title="commit.message"
    @click.prevent="selectCommit($event)">
    <span class="commit-message">{{commit.message}}</span>
    <span class="commit-hash">{{commit.hash | takeFirstElevenLetters}}</span>
  </div>
</template>

<script>
export default {
  props: {
    commit: {
      type: Object,
      default: () => ({commit: '', hash: ''})
    }
  },
  computed: {
    isSelected() {
      const revision1 = this.$store.state.git.revision1;
      const revision2 = this.$store.state.git.revision2;
      return [revision1, revision2]
        .some(selectedCommit => selectedCommit === this.commit.hash);
    }
  },
  filters: {
    takeFirstElevenLetters(value) {
      return value.substring(0, 11);
    }
  },
  methods: {
    selectCommit(event) {
      const commitHash = this.commit.hash;
      if (event.shiftKey) {
        document.getSelection().removeAllRanges();
        this.selectMultipleCommits(commitHash);
      } else {
        this.selectSingleCommits(commitHash);
        this.collapseAfterSelection();
      }
    },
    selectMultipleCommits(commitHash) {
      const revision1 = this.$store.state.git.revision1;
      const revision2 = this.$store.state.git.revision2;
      if (revision1 && !revision2) {
        this.$store.commit('git/setRevision', {key: 'revision2', revision: commitHash});
        this.collapseAfterSelection();
      } else {
        this.selectSingleCommits(commitHash);
      }
    },
    selectSingleCommits(commitHash) {
      this.$store.commit('git/setRevision', {key: 'revision1', revision: commitHash});
      this.$store.commit('git/setRevision', {key: 'revision2', revision: undefined});
    },
    collapseAfterSelection() {
      this.$store.commit('commits-selection/collapseSelection', true);
    }
  }
};
</script>

<style scoped>
.commit-hash {
  display: inline-block;
  position: absolute;
  right: var(--spacing);
  max-width: 20%;
}

.commit-message {
  display: inline-block;
  width: calc(80% - var(--spacing));
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commit {
  position: relative;
  cursor: pointer;
  list-style: none;
  padding: var(--spacing);
}

.commit:hover {
  background: var(--color-light-gray-2);
}

.commit.selected {
  background: var(--color-primary);
  color: var(--color-white);
}
</style>
