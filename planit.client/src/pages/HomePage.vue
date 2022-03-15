<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row">
      <div class="col-2">
        <button
          data-bs-toggle="modal"
          data-bs-target="#create-project"
          class="btn btn-info"
        >
          Create Project
        </button>
      </div>
      <div
        class="col-3 home-card p-5 bg-white rounded elevation-3 m-3"
        v-for="p in projects"
        :key="p.id"
      >
        <Project :project="p" />
      </div>
    </div>
    <div
      v-if="!account.id"
      class="
        home
        flex-grow-1
        d-flex
        flex-column
        align-items-center
        justify-content-center
      "
    >
      <div class="home-card p-5 bg-secondary rounded elevation-3 m-3">
        <h2>Please Log in</h2>
      </div>
    </div>
  </div>
  <Modal id="create-project">
    <template #title> Create Project </template>
    <template #body><ProjectForm :projectData="projects" /></template>
  </Modal>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { projectsService } from "../services/ProjectsService"
import { AppState } from "../AppState"
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        // await projectsService.getAllProjects()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      projects: computed(() => AppState.projects),
      account: computed(() => AppState.account),
      async createProject() {
        try {

        } catch (error) {
          next(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
