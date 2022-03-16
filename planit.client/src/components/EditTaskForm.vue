<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="editTask"
  >
    <h2>{{ editTask.name }}</h2>
    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Sprint Choices
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li v-for="s in sprints" :key="s.id">
          <a
            class="dropdown-item"
            href="#"
            data-bs-dismiss="modal"
            @click="moveTask(s)"
            >{{ s.name }}</a
          >
        </li>
      </ul>
    </div>
  </form>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import { tasksService } from "../services/TasksService"
import { AppState } from "../AppState"
export default {
  props: {
    editTask: {
      type: Object,
      required: false
    }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      // async editTask() {
      //   try {
      //     editable.value.projectId = route.params.id
      //     editable.value.taskId = props.editTask
      //     await tasksService.editTask(editable.value)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // },
      async moveTask(sprint) {
        try {

          props.editTask.sprintId = sprint.id
          await tasksService.moveTask(props.editTask)
        } catch (error) {
          logger.error(error)
        }
      },
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>