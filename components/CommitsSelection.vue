<template>
  <div class="selections" v-if="isSelecting">
    <div class="error" v-if="error.length">{{error}}</div>
    <input
      placeholder="Search for commit message..."
      type="text"
      class="filter"
      @input="searchCommits"/>
    <div
      v-for="commit in commits"
      class="commit"
      :key="commit.hash"
      :title="commit.message"
      @click.prevent="selectCommit(commit.hash)">
      <span class="commit-message">{{commit.message}}</span>
      <span class="commit-hash">{{commit.hash | takeFirstSevenLetters}}</span>
    </div>
  </div>
</template>

<script>
import gitLogService from '~/src/git/log';
import fuzzy from 'fuzzysort';

export default {
  filters: {
    takeFirstSevenLetters(value) {
      return value.substring(0, 7);
    }
  },
  props: {
    isSelecting: {
      type: Boolean, default: false
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
    async searchCommits(e) {
      const value = e.target.value;
      if (value.length === 0) {
        this.getCommits();
        return;
      }
      try {
        const service = gitLogService(this.$git);
        const commits = await service.getAllLogs();
        const filtered = await fuzzy.goAsync(value, commits, {key: 'message'});
        this.commits = filtered.map(searchResult => searchResult.obj);
      } catch (err) {
        this.error = err;
      }
    },
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
  overflow: hidden;
  padding: 0;
  position: absolute;
  top: calc(100%);
  width: 300%;
}

.commit-hash {
  color: var(--color-light-gray-2);
  display: inline-block;
  width: 17%;
  position: absolute;
  right: 0;
}

.commit-message {
  display: inline-block;
  width: 83%;
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
  background: var(--color-blue-7);
}

.filter {
  background: transparent;
  border: 0 none;
  border-bottom: 1px solid var(--color-blue-7);
  margin: var(--spacing);
  padding: var(--spacing);
  width: calc(100% - (var(--spacing) * 2));
}

.filter,
.filter::placeholder {
  color: var(--color-white);
  font-size: 0.9rem;
}
</style>
