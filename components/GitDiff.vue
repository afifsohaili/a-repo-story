<template>
  <pre>
    {{diff}}
  </pre>
</template>

<script>
import path from 'path';
import simpleGit from 'simple-git/promise';

const git = simpleGit(path.resolve('./../afifsohaili'));

export default {
  data() {
    return {diff: ''};
  },
  methods: {
    async getDiff() {
      const rev1 = this.$store.state.git.revision1;
      const rev2 = this.$store.state.git.revision2;

      if (![rev1, rev2].every(rev => rev)) {
        this.diff = 'Select two revisions';
        return;
      }

      const diff = await git.diff([`${rev1}...${rev2}`]);
      if (diff) {
        this.diff = diff;
        return;
      }
      this.diff = await git.diff([`${rev2}...${rev1}`]);
    }
  },
  watch: {
    '$store.state.git.revision1'() {
      this.getDiff();
    },
    '$store.state.git.revision2'() {
      this.getDiff();
    }
  }
};
</script>

<style scoped>
pre {
  background: #fff;
  position: fixed;
  max-height: 100px;
  overflow: scroll;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  border-top: 1px solid #c5c5c5;
}
</style>
