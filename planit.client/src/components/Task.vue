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
    <i class="mdi mdi-delete selectable" @click="deleteTask"></i>
  </div>
  <div>
    {{ task.weight }}
  </div>
</template>


<script>
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      // async checked() {
      //   try {
      //     props.task.isComplete = !props.task.isComplete
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
      async deleteTask() {
        try {
          await tasksService.deleteTask(route.params.id, props.task.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>