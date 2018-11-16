<template>
  <div class="selections">
    <div class="error" v-if="error.length">{{error}}</div>
    <input
      placeholder="Search for commit message..."
      type="text"
      class="filter"
      @input="searchCommits"/>
    <commit-menu-item
      v-for="commit in commits"
      :key="commit.hash + commit.hash"
      :commit="commit"/>
  </div>
</template>

<script>
import fuzzy from 'fuzzysort';
import CommitMenuItem from '~/components/CommitMenuItem';

export default {
  components: {CommitMenuItem},
  props: {
    revisionKey: {
      type: String,
      default: undefined
    },
    toggleSelection: Function
  },
  data() {
    return {
      error: '',
      revision1: undefined,
      revision2: undefined
    };
  },
  computed: {
    commits() {
      return this.$store.state.git.commits;
    }
  },
  methods: {
    isCommitSelected(commitHash) {
      return this.$store.state.revision1 === commitHash ||
        this.$store.state.revision2 === commitHash;
    },
    async searchCommits(e) {
      const value = e.target.value;
      if (value.length === 0) {
        return;
      }
      try {
        const commits = this.$store.state.git.commits;
        const filtered = await fuzzy.goAsync(value, commits, {key: 'message'});
        this.commits = filtered.map(searchResult => searchResult.obj);
      } catch (err) {
        this.error = err;
      }
    }
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

.filter {
  background: transparent;
  border: 0 none;
  border-bottom: 1px solid var(--color-light-gray-2);
  padding: calc(var(--spacing) * 2) var(--spacing);
  width: 100%;
}

.filter,
.filter::placeholder {
  font-size: 0.9rem;
}
</style>
