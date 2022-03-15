<template>
  <div class="component">
    <h1>{{ project.name }}</h1>
  </div>
</template>


<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
      default: {},
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>