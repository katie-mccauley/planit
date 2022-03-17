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
    @submit.prevent="createNote"
  >
    <h2>Create Note</h2>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Body: </label>
      <input
        v-model="editable.body"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { logger } from "../utils/Logger"
import { notesService } from "../services/NotesService"
import { Modal } from "bootstrap"
export default {
  props: {
    taskData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createNote() {
        try {
          editable.value.projectId = route.params.id
          editable.value.taskId = props.taskData.id
          Modal.getOrCreateInstance(document.getElementById('create-note' + props.taskData.id)).hide()

          await notesService.createNote(editable.value)
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