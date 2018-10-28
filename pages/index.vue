<template>
  <div>
    <commits-selection class="pane"/>
    <git-diff class="diff" />
  </div>
</template>

<script>
import CommitsSelection from '~/components/CommitsSelection';
import GitDiff from '~/components/GitDiff';

export default {
  components: {GitDiff, CommitsSelection}
};
</script>
