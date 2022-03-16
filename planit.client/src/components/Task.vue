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
    <i
      class="mdi mdi-pencil selectable"
      data-bs-toggle="modal"
      data-bs-target="#edit-task"
    ></i>
  </div>
  <div>Task Weight: {{ task.weight }}</div>
  <div>
    <i
      data-bs-toggle="modal"
      data-bs-target="#create-note"
      class="mdi mdi-message"
    ></i>
  </div>
  <div class="row">
    <div class="col" v-for="n in notes" :key="n.id">
      <Notes :note="n" />
    </div>
  </div>
  <Modal id="create-note">
    <template #title> Create Task </template>
    <template #body><NoteForm :note="task.id" /></template>
  </Modal>
  <Modal id="edit-task">
    <template #title> Edit Task </template>
    <template #body><EditTaskForm :editTask="task.id" /></template>
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
    // onMounted(async () => {
    //   try {
    //     await notesService.getAllNotes(route.params.id)
    //   } catch (error) {
    //     logger.error(error)
    //   }
    // })
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
      },
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id))
    }
  }
}
</script>


<style lang="scss" scoped>
</style>