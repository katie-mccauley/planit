<template>
  <div class="container-fluid">
    <div class="row justify-content-end">
      <div class="col-2">
        <button
          data-bs-toggle="modal"
          data-bs-target="#create-sprint"
          class="btn btn-success"
        >
          Create Sprint
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-10" v-for="s in sprints" :key="s.id">
        <Sprint :sprint="s" />
      </div>
    </div>
  </div>
  <Modal id="create-sprint">
    <template #title> Create Sprint </template>
    <template #body><SprintForm /></template>
  </Modal>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { sprintsService } from "../services/SprintsService"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
export default {

  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await sprintsService.getAllSprints(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
.hsprint {
  height: 30px;
}
</style>