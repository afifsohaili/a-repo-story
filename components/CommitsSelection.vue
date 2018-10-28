<template>
  <div v-if="logs.length" class="pane" :class="{'is-collapsed': collapsed}">
    <div>
      <input type="text" v-model="keyword" v-if="!collapsed">
      <button @click.prevent="toggleCollapse" v-if="!collapsed">
        &lt;&lt;
      </button>
      <button @click.prevent="toggleCollapse" v-else>
        &gt;&gt;
      </button>
    </div>
    <ul v-if="!collapsed">
      <template v-if="shouldShowAllLogs">
        <li v-for="log in logs" :key="log.hash" :class="isSelected(log.hash) ? 'selected' : ''" @click="setRevision(log.hash)">
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
  data() {
    return {
      keyword: '',
      logs: [],
      results: [],
      collapsed: false
    };
  },
  computed: {
    noResultsFound() {
      return this.keyword.length && !this.results.length;
    },
    shouldShowAllLogs() {
      return this.logs.length && !this.keyword.length;
    },
    shouldShowSearchResults() {
      return this.logs.length && this.keyword.length && this.results.length;
    }
  },
  mounted() {
    this.$git.log({'--pretty': 'oneline', '--max-parents': '1'}, (err, logs) => {
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
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    async filterLogs() {
      const messages = this.logs.map(log => log.message);
      const results = await fuzzy.goAsync(this.keyword, messages);
      const resultsMessages = results.map(result => result.target);
      this.results = this.logs.filter(log => resultsMessages.includes(log.message));
    },
    isSelected(commitHash) {
      const {revision1, revision2} = this.$store.state.git;
      return [revision1, revision2].some(revision => revision === commitHash);
    },
    setRevision(commitHash) {
      const {revision1, revision2} = this.$store.state.git;
      if (revision1 && !revision2) {
        this.$store.commit('git/setRevision', {key: 'revision2', revision: commitHash});
      } else if (revision1 && revision2) {
        this.$store.commit('git/setRevision', {key: 'revision1', revision: commitHash});
        this.$store.commit('git/setRevision', {key: 'revision2', revision: undefined});
      } else {
        this.$store.commit('git/setRevision', {key: 'revision1', revision: commitHash});
      }
    }
  }
};
</script>

<style scoped>
.pane {
  background: #fff;
  left: 0;
  max-width: 91%;
  position: fixed;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  cursor: pointer;
}

li:hover {
  background: #e5e5e5;
}

.selected {
  background: #909090;
  color: #fff;
}
</style>
