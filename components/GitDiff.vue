<template>
  <pre>
    {{diff}}
  </pre>
</template>

<script>
export default {
  data() {
    return {diff: ''};
  },
  methods: {
    getDiff() {
      const rev1 = this.$store.state.git.revision1;
      const rev2 = this.$store.state.git.revision2;

      if (![rev1, rev2].every(rev => rev)) {
        this.diff = 'Select two revisions';
        return;
      }

      this.$git.diff([`${rev1}...${rev2}`], (err, diff) => {
        if (err) {
          throw err;
        }
        if (diff) {
          this.diff = diff;
          return;
        }
        this.$git.diff([`${rev2}...${rev1}`], (err, diff) => {
          if (err) {
            throw err;
          }
          this.diff = diff;
        });
      });
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
