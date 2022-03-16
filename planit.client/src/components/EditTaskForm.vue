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
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Task Name: </label>
      <input
        v-model="editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>

    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Task Weight: </label>
      <input
        v-model="editable.weight"
        required
        type="number"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Task Weight....."
      />
    </div>

    <div class="dropdown">
      <a
        class="btn btn-secondary dropdown-toggle"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Dropdown link
      </a>

      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li v-for="s in sprints" :key="s.id">
          <a class="dropdown-item" href="#" @click="moveTask(s.id)">{{
            s.name
          }}</a>
        </li>
      </ul>
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button data-bs-dismiss="modal" class="btn btn-primary">edit task</button>
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
      async editTask() {
        try {
          editable.value.projectId = route.params.id
          editable.value.taskId = props.editTask
          await tasksService.editTask(editable.value)
        } catch (error) {
          logger.error(error)
        }
      },
      async moveTask(sprintId) {
        logger.log('sprint id', sprintId)
      },
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>