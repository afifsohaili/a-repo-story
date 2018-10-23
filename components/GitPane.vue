<template>
  <div v-if="logs.length">
    <div>
      <input type="text" v-model="keyword">
      <span class="git-rev">
        {{this.selectedRevision}}
      </span>
    </div>
    <ul>
      <template v-if="shouldShowAllLogs">
        <li v-for="log in logs" :key="log.hash" @click="setRevision(log.hash)">
          {{log.message}}
        </li>
      </template>
      <li v-if="!logs.length">No logs found. Not a git folder?</li>
      <template v-if="shouldShowSearchResults">
        <li v-for="result in results" :key="result.hash" @click="setRevision(result.hash)">
          {{result.message}}
        </li>
      </template>
      <li v-if="noResultsFound">No results found for <em>{{keyword}}</em></li>
    </ul>
  </div>
</template>

<script>
import fuzzy from 'fuzzysort';

export default {
  props: ['id', 'index', 'path'],
  data() {
    return {
      keyword: '',
      logs: [],
      results: []
    };
  },
  computed: {
    noResultsFound() {
      return this.keyword.length && !this.results.length;
    },
    selectedRevision() {
      return this.$store.state.git[this.index];
    },
    shouldShowAllLogs() {
      return this.logs.length && !this.keyword.length;
    },
    shouldShowSearchResults() {
      return this.logs.length && this.keyword.length && this.results.length;
    }
  },
  mounted() {
    this.$git.log({'--pretty': 'oneline'}, (err, logs) => {
      if (err) {
        throw err;
      }
      this.logs = logs.all;
      this.noResults = false;
    });
  },
  watch: {
    keyword() {
      this.filterLogs();
    }
  },
  methods: {
    async filterLogs() {
      const messages = this.logs.map(log => log.message);
      const results = await fuzzy.goAsync(this.keyword, messages);
      const resultsMessages = results.map(result => result.target);
      this.results = this.logs.filter(log => resultsMessages.includes(log.message));
    },
    setRevision(commitHash) {
      if (this.$store.state.git[this.index] === commitHash) {
        this.$store.commit('git/setRevision', {key: this.index, revision: ''});
        return;
      }
      this.$store.commit('git/setRevision', {key: this.index, revision: commitHash});
    }
  }
};
</script>

<style scoped>
li {
  cursor: pointer;
}

li:hover {
  background: #e5e5e5;
}

.git-rev {
  display: inline-block;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
