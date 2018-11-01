<template>
  <div class="commits-selection">
    <button class="selector" @click.prevent="toggleSelection">
      <slot />
    </button>
    <div class="selections" v-if="isSelecting">
      <div class="error" v-if="error.length">{{error}}</div>
      <div
        v-for="commit in commits"
        class="commit"
        :key="commit.hash">
        {{commit.message}}
      </div>
    </div>
  </div>
</template>

<script>
import gitLogService from '~/src/git/log';

export default {
  data() {
    return {
      isSelecting: false,
      error: '',
      commits: []
    };
  },
  methods: {
    async getCommits() {
      try {
        const commits = await gitLogService(this.$git).getAllLogs();
        this.commits = commits;
      } catch (err) {
        console.error('\n', 'err', err);
        this.error = err;
      }
    },
    toggleSelection() {
      this.isSelecting = !this.isSelecting;
      if (!this.commits.length) {
        this.getCommits();
      }
    }
  }
};
</script>

<style scoped>
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

.commits-selection {
  display: inline-block;
  position: relative;
}

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
