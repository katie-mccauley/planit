<template>
  <form
    class="
      bg-secondary
      textpurple
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="createTask"
  >
    <h2>Create Task</h2>
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

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btnpink">create task</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import { Modal } from "bootstrap"
export default {
  props: {
    sprintId: {
      type: Object,
      required: false,
    }
  },
  setup(props) {

    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createTask() {
        try {
          editable.value.projectId = route.params.id
          editable.value.sprintId = props.sprintId
          Modal.getOrCreateInstance(document.getElementById('create-task' + props.sprintId)).hide()
          await tasksService.createTask(editable.value)
          editable.value = {}
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.textpurple {
  color: #ff48fa;
}
.btnpink {
  background-color: rgba(245, 73, 156, 1);
}
</style>