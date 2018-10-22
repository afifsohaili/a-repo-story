<template>
  <div>
    <h1>
      Simple git
    </h1>
    <panes>
      <pane>
        <git-pane index="revision1" :path="gitPath"/>
      </pane><pane>
        <git-pane index="revision2" :path="gitPath"/>
      </pane>
    </panes>
    <git-diff />
  </div>
</template>

<script>
import Pane from '~/components/Pane';
import Panes from '~/components/Panes';
import GitPane from '~/components/GitPane';
import GitDiff from '~/components/GitDiff';

export default {
  components: {GitDiff, GitPane, Pane, Panes},
  data() {
    return {gitPath: process.env.GIT_PATH};
  }
};
</script>

<style scoped>
</style>
