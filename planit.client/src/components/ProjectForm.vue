<template>
  <form
    class="
      bg-secondary
      darken-20
      justify-content-center
      elevation-3
      text-purple
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="createProject"
  >
    <h2>Create Project</h2>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="state.editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Description: </label>
      <input
        v-model="state.editable.description"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Description....."
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btnpink">create</button>
    </div>
  </form>
</template>


<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import { projectsService } from "../services/ProjectsService";
import { watchEffect } from "@vue/runtime-core";
import { Modal } from "bootstrap";
export default {
  props: {
    projectData: {
      type: Object,
      required: false,
    }
  },
  setup(props) {
    const router = useRouter();
    const state = reactive({
      editable: {},
    });
    return {
      state,
      async createProject() {
        try {
          Modal.getOrCreateInstance(document.getElementById('create-project')).hide()
          let id = await projectsService.createProject(state.editable)
          state.editable = {}
          router.push({ name: 'Project', params: { id } })
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