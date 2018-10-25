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
  width: 100%;
}
</style>
