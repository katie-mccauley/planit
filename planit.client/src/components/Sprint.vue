<template>
  <div class="row justify-content-center m-3">
    <div class="col-6 bg-light text-dark">
      SPRINT NAME
      <h2>{{ sprint.name }}</h2>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>