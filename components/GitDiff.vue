<template>
  <div
    class="wrapper"
    :class="commitsSelectionCollapsed && 'is-commits-selection-collapsed'">
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
import {processLine} from '~/src/diff-formatting';

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

      if ([rev1, rev2].every(rev => rev)) {
        return this.$git.diff(['--word-diff=plain', `${rev1}...${rev2}`], (err, diff) => {
          if (err) {
            this.error = err.message;
            throw err;
          }
          if (diff) {
            this.diff = diff;
            return;
          }
          this.$git.diff(['--word-diff=plain', `${rev2}...${rev1}`], (err, diff) => {
            if (err) {
              this.error = err.message;
              throw err;
            }
            this.diff = diff;
          });
        });
      }

      this.$git.show(['--word-diff=plain', rev1], (err, show) => {
        if (err) {
          this.error = err;
          throw err;
        }
        if (show) {
          this.diff = show;
        }
      });

      this.error = '';
    }
  },
  computed: {
    commitsSelectionCollapsed() {
      return this.$store.state['commits-selection'].collapsed;
    },
    styledDiff() {
      if (!this.diff) {
        return '';
      }
      const diffInLines = this.diff.split('\n');
      return diffInLines
        .map(diffLine => ({line: diffLine}))
        .map(diffLineArgs => encodeHtmlEntities(diffLineArgs))
        .map(diffLineArgs => replaceTabWithSpaces(diffLineArgs))
        .map(diffLineArgs => processLine(diffLineArgs));
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
  padding: var(--spacing) 0;
  margin-left: 60%;
}

.wrapper.is-commits-selection-collapsed {
  margin-left: 0;
}

.error {
  background: #ffebee;
  border: 1px solid #ef5350;
  color: #ef5350;
  padding: 1rem;
  margin-bottom: 1rem;
}

.diff {
  display: inline-block;
  min-width: 100%;
}
</style>
