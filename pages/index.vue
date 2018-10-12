<template>
  <div>
    <h1>
      Simple git
    </h1>
    <template v-if="logs">
      <ul>
        <li v-for="log in logs" :key="log.hash">
          {{ log.message }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import simpleGit from 'simple-git';
import path from 'path';

export default {
  data() {
    return {
      logs: []
    };
  },
  mounted() {
    const git = simpleGit(path.resolve('./../afifsohaili'));

    git.log({'--pretty': 'oneline'}, (err, logs) => {
      if (err) {
        throw err;
      }
      console.log('\n', 'log', logs);
      this.logs = logs.all;
    });
  }
};
</script>

<style scoped>
</style>
