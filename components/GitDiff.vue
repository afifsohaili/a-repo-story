<template>
  <div class="wrapper">
    <p class="error" v-if="error.length">
      {{error}}
    </p>
    <div class="diff">
      <diff-line
        v-for="(lineArgs, i) in styledDiff"
        :key="'diffLine' + i"
        v-bind="lineArgs">
      </diff-line>
    </div>
  </div>
</template>

<script>
import entities from 'entities';
import DiffLine from '~/components/DiffLine';

const formatForAddition = ({line, ...props}) => {
  const lineIsAddition =
    line.startsWith(entities.encodeHTML('+')) &&
    !line.startsWith(entities.encodeHTML('+++'));
  return lineIsAddition ? {line, ...props, addition: true} : {line, ...props};
};

const formatForDeletion = ({line, ...props}) => {
  const lineIsDeletion =
    line.startsWith(entities.encodeHTML('-')) &&
    !line.startsWith(entities.encodeHTML('---'));
  return lineIsDeletion ? {line, ...props, deletion: true} : {line, ...props};
};

const replaceTabWithSpaces = ({line, ...props}) => {
  return {
    line: line
      .replace(/ {2}/g, '&nbsp;'.repeat(2))
      .replace(/ /g, '&nbsp;'),
    ...props
  };
};

const encodeHtmlEntities = ({line, ...props}) => {
  return {line: entities.encodeHTML(line), ...props};
};

export default {
  components: {DiffLine},
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
  computed: {
    styledDiff() {
      if (!this.diff) {
        return '';
      }
      const diffInLines = this.diff.split('\n');
      return diffInLines
        .map(diffLine => ({line: diffLine}))
        .map(diffLineArgs => encodeHtmlEntities(diffLineArgs))
        .map(diffLineArgs => replaceTabWithSpaces(diffLineArgs))
        .map(diffLineArgs => formatForAddition(diffLineArgs))
        .map(diffLineArgs => formatForDeletion(diffLineArgs));
    }
  },
  watch: {
    '$store.state.git.revision1'() {
      this.diff = '';
    },
    '$store.state.git.revision2'() {
      this.getDiff();
    }
  }
};
</script>

<style scoped>
.error {
  background: #ffebee;
  border: 1px solid #ef5350;
  color: #ef5350;
  padding: 1rem;
  margin-bottom: 1rem;
}

.diff {
  display: inline-block;
}
</style>
