<template>
  <div class="container">
    <git-pane class="pane"/>
    <git-diff class="diff" />
  </div>
</template>

<script>
import GitPane from '~/components/GitPane';
import GitDiff from '~/components/GitDiff';

export default {
  components: {GitDiff, GitPane},
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
