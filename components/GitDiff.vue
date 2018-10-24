<template>
  <div class="wrapper">
    <p class="error" v-if="error.length">
      {{error}}
    </p>
    <pre>
      {{diff}}
    </pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: '',
      diff: ''
    };
  },
  methods: {
    getDiff() {
      const rev1 = this.$store.state.git.revision1;
      const rev2 = this.$store.state.git.revision2;

      if (![rev1, rev2].every(rev => rev)) {
        this.error = 'Select two revisions';
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

      this.error = '';
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
.wrapper {
  padding: 1rem;
}

.error {
  background: #ffebee;
  border: 1px solid #ef5350;
  color: #ef5350;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
