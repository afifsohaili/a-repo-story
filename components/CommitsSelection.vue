<template>
  <div class="selections" v-if="isSelecting">
    <div class="error" v-if="error.length">{{error}}</div>
    <div
      v-for="commit in commits"
      class="commit"
      :key="commit.hash"
      @click.prevent="selectCommit(commit.hash)">
      {{commit.message}}
    </div>
  </div>
</template>

<script>
import gitLogService from '~/src/git/log';

export default {
  props: {
    isSelecting: {
      type: Boolean,
      default: false
    },
    revisionKey: {
      type: String,
      default: undefined
    },
    toggleSelection: Function
  },
  data() {
    return {
      error: '',
      commits: []
    };
  },
  methods: {
    async getCommits() {
      try {
        const service = gitLogService(this.$git);
        this.commits = await service.getLatestLogs();
      } catch (err) {
        this.error = err;
      }
    },
    selectCommit(commitHash) {
      this.$store.commit('git/setRevision', {key: this.revisionKey, revision: commitHash});
      this.toggleSelection();
    }
  },
  watch: {
    isSelecting() {
      if (this.isSelecting && !this.commits.length) {
        this.getCommits();
      }
    }
  }
};
</script>

<style scoped>
.selections {
  background: var(--color-primary);
  border-radius: var(--border-radius-l);
  color: var(--color-white);
  margin: 0;
  max-height: 500%;
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: calc(100%);
  width: 300%;
}

.commit {
  cursor: pointer;
  list-style: none;
  overflow: hidden;
  overflow: hidden;
  padding: var(--spacing);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.commit:hover {
  background: var(--color-blue-7);
}
</style>
