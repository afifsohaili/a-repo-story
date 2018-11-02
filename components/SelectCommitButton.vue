<template>
  <div class="select-commit-button">
    <a class="selector" @click.prevent="toggleSelection">
      <span v-if="!selectedRevision.length" >
        <slot/>
      </span>
      <span v-else>
        {{selectedRevision}}
      </span>
    </a>
    <commits-selection
      :is-selecting="isSelecting"
      :toggle-selection="toggleSelection"
      :revision-key="revisionKey"/>
  </div>
</template>

<script>
import CommitsSelection from '~/components/CommitsSelection';

export default {
  components: {
    CommitsSelection
  },
  props: {
    revisionKey: {
      type: String,
      default: undefined
    }
  },
  computed: {
    selectedRevision() {
      return (this.$store.state.git && this.$store.state.git[this.revisionKey]) || '';
    }
  },
  data() {
    return {isSelecting: false};
  },
  methods: {
    toggleSelection() {
      this.isSelecting = !this.isSelecting;
    }
  }
};
</script>

<style scoped>
.selector {
  border-radius: var(--border-radius-l);
  border: 1px solid var(--color-primary);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: var(--spacing);
  padding-right: calc(var(--spacing) * 3);
  position: relative;
  white-space: nowrap;
}

.selector::after {
  border-color: #007bff transparent transparent transparent;
  border-style: solid;
  border-width: 6.1px 3.5px 0 3.5px;
  content: " ";
  height: 0;
  position: absolute;
  right: calc(var(--spacing));
  top: calc(50% - 3px);
  width: 0;
}

.select-commit-button {
  display: inline-block;
  position: relative;
}

.select-commit-button a span {
  display: inline-block;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
