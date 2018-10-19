<template>
  <div>
    <h1>
      Simple git
    </h1>
    <panes>
      <pane>
        <git-pane index="revision1" path="./../afifsohaili"/>
      </pane><pane>
        <git-pane index="revision2" path="./../afifsohaili"/>
      </pane>
    </panes>
  </div>
</template>

<script>
import Pane from '~/components/Pane';
import Panes from '~/components/Panes';
import GitPane from '~/components/GitPane';

export default {
  components: {Pane, Panes, GitPane}
};
</script>

<style scoped>
</style>
