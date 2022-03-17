<template>
  <div class="form-check">
    <input
      class="form-check-input selectable"
      type="checkbox"
      @change="checked"
      :checked="task.isComplete"
      id="flexCheckDefault"
    />
    <label class="form-check-label" for="flexCheckDefault">
      {{ task.name }}
    </label>
    <i
      class="mdi mdi-delete selectable"
      title="Delete Task"
      @click="deleteTask"
    ></i>
    <i
      title="Edit Task"
      class="mdi mdi-pencil selectable"
      data-bs-toggle="modal"
      :data-bs-target="'#edit-task' + task.id"
    ></i>
    <div>
      <i
        title="Create Note"
        data-bs-toggle="modal"
        :data-bs-target="'#create-note' + task.id"
        class="mdi mdi-message selectable"
      ></i>
    </div>
    <div class="row">
      <div class="col" v-for="n in notes" :key="n.id">
        <Notes :note="n" />
      </div>
    </div>
  </div>
  <div><i class="mdi mdi-weight"></i> {{ task.weight }}</div>

  <Modal :id="'create-note' + task.id">
    <template #title> Create Task </template>
    <template #body><NoteForm :taskData="task" /></template>
  </Modal>
  <Modal :id="'edit-task' + task.id">
    <template #title> Edit Task </template>
    <template #body><EditTaskForm :editTask="task" /></template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { notesService } from "../services/NotesService"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await notesService.getAllNotes(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      async checked() {
        try {
          await tasksService.checked(props.task, route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteTask() {
        try {
          await tasksService.deleteTask(route.params.id, props.task.id)
        } catch (error) {
          logger.error(error)
        }
      },
      // async getTotalTaskWeight(){

      // }
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id))
    }
  }
}
</script>


<style lang="scss" scoped>
</style>