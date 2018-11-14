<template>
  <div class="selections">
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
      <span class="commit-hash">{{commit.hash | takeFirstElevenLetters}}</span>
    </div>
  </div>
</template>

<script>
import gitLogService from '~/src/git/log';
import fuzzy from 'fuzzysort';

export default {
  filters: {
    takeFirstElevenLetters(value) {
      return value.substring(0, 11);
    }
  },
  props: {
    revisionKey: {
      type: String,
      default: undefined
    },
    toggleSelection: Function
  },
  data() {
    return {
      commits: [],
      error: '',
      revision1: undefined,
      revision2: undefined
    };
  },
  methods: {
    async searchCommits(e) {
      const value = e.target.value;
      if (value.length === 0) {
        this.getLogs();
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
    async getLogs() {
      try {
        const service = gitLogService(this.$git);
        this.commits = await service.getAllLogs();
      } catch (err) {
        this.error = err;
      }
    },
    selectCommit(commitHash) {
      if (this.revision1 && !this.revision2) {
        this.$store.commit('git/setRevision', {key: 'revision2', revision: commitHash});
        this.revision2 = commitHash;
        return;
      }
      this.revision1 = commitHash;
      this.$store.commit('git/setRevision', {key: 'revision1', revision: commitHash});
      this.revision2 = undefined;
      this.$store.commit('git/setRevision', {key: 'revision2', revision: undefined});
    }
  },
  mounted() {
    this.getLogs();
  }
};
</script>

<style scoped>
.selections {
  background: var(--color-white);
  border-radius: var(--border-radius-l);
  border: 1px solid var(--color-light-gray-2);
  left: 0;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: fixed;
  top: 0;
  width: 60%;
}

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

.filter {
  background: transparent;
  border: 0 none;
  border-bottom: 1px solid var(--color-light-gray-2);
  padding: calc(var(--spacing) * 2) var(--spacing);
  width: calc(100% - (var(--spacing) * 2));
}

.filter,
.filter::placeholder {
  font-size: 0.9rem;
}
</style>
