<template>
  <router-link :to="{ name: 'Project', params: { id: project.id } }">
    <div class="">
      <h1>{{ project.name }}</h1>
    </div>
  </router-link>
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