<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      value=""
      id="flexCheckDefault"
    />
    <label class="form-check-label" for="flexCheckDefault">
      {{ task.name }}
    </label>
  </div>
  <div>
    {{ task.weight }}
  </div>
</template>


<script>
export default {
  props: {
    task: {
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