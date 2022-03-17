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
    @submit.prevent="createSprint"
  >
    <h2>Create Sprint</h2>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
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
import { reactive, ref } from "@vue/reactivity";
import { sprintsService } from "../services/SprintsService";
import { logger } from "../utils/Logger";
import { useRoute } from "vue-router";
import { Modal } from "bootstrap";
export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    return {
      editable,
      async createSprint() {
        try {
          editable.value.projectId = route.params.id
          Modal.getOrCreateInstance(document.getElementById('create-sprint')).hide()
          await sprintsService.createSprint(editable.value)
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
</style>