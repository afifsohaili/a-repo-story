<template>
  <div>
    <h1>
      Simple git
    </h1>
    <template v-if="logs.length">
      <input type="text" v-model="keyword">
      <ul>
        <template v-if="shouldShowAllLogs">
          <li v-for="log in logs" :key="log.hash">
            {{log.message}}
          </li>
        </template>
        <li v-if="!logs.length">No logs found. Not a git folder?</li>
        <template v-if="shouldShowSearchResults">
          <li v-for="result in results" :key="result.hash">
            {{result.message}}
          </li>
        </template>
        <li v-if="noResultsFound">No results found for <em>{{keyword}}</em></li>
      </ul>
    </template>
  </div>
</template>

<script>
import simpleGit from 'simple-git';
import path from 'path';
import fuzzy from 'fuzzysort';

export default {
  data() {
    return {
      logs: [],
      keyword: '',
      results: []
    };
  },
  computed: {
    shouldShowAllLogs() {
      return this.logs.length && !this.keyword.length;
    },
    shouldShowSearchResults() {
      return this.logs.length && this.keyword.length && this.results.length;
    },
    noResultsFound() {
      return this.keyword.length && !this.results.length;
    }
  },
  mounted() {
    const git = simpleGit(path.resolve('./../afifsohaili'));

    git.log({'--pretty': 'oneline'}, (err, logs) => {
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
    }
  }
};
</script>

<style scoped>
</style>
