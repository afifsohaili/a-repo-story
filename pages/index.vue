<template>
  <div class="container">
    <commits-selection class="pane"/>
    <git-diff class="diff" />
  </div>
</template>

<script>
import CommitsSelection from '~/components/CommitsSelection';
import GitDiff from '~/components/GitDiff';

export default {
  components: {GitDiff, CommitsSelection},
  data() {
    return {gitPath: process.env.GIT_PATH};
  }
};
</script>

<style scoped>
.container {
  display: flex;
}

.pane {
  flex: 33% 1 0;
}

.diff {
  flex: 67% 1 0;
}
</style>
