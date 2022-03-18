<template>
  <router-link :to="{ name: 'Project', params: { id: project.id } }">
    <div class="">
      <h1 class="text-dark">{{ project.name }}</h1>
    </div>
  </router-link>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
export default {
  props: {
    project: {
      type: Object,
      required: true,
      default: {},
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
    }
  }
}
</script>


<style lang="scss" scoped>
</style>