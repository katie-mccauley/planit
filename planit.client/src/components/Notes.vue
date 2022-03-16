<template>
  <h4>{{ note.body }}</h4>
</template>


<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>