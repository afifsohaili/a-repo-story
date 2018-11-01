<template>
  <div>
    <commits-selection-pane class="pane"/>
    <git-diff class="diff" />
  </div>
</template>

<script>
import CommitsSelectionPane from '~/components/CommitsSelectionPane';
import GitDiff from '~/components/GitDiff';

export default {
  components: {
    GitDiff,
    CommitsSelectionPane
  }
};
</script>
