<template>
  <div class="row justify-content-center m-3">
    <div class="col-6 bg-light text-dark">
      SPRINT NAME
      <i @click="deleteSprint" class="selectable mdi mdi-delete"></i>
      <h2>{{ sprint.name }}</h2>
      <div>
        <i
          data-bs-toggle="modal"
          data-bs-target="#create-task"
          class="mdi mdi-plus selectable"
        ></i>
        <h2>There is the tasks section</h2>
      </div>
    </div>
  </div>
  <Modal id="create-task">
    <template #title> Create Task </template>
    <template #body><TaskForm /></template>
  </Modal>
</template>


<script>
import { onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { sprintsService } from "../services/SprintsService"
import { logger } from "../utils/Logger"
import { tasksService } from "../services/TasksService"
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await tasksService.getAllTasks(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })

    return {
      async deleteSprint() {
        try {
          await sprintsService.deleteSprint(route.params.id, props.sprint.id)
        } catch (error) {
          logger.error(error)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>