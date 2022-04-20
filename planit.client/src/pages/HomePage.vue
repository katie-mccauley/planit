<template>
  <div class="container-fluid">
    <div v-if="account.id" class="row justify-content-center m-2">
      <div class="col-md-10 bg-light shadow rounded outline">
        <div class="row justify-content-center">
          <div class="col-md-12 outline">
            <div class="row m-md-5 m-2">
              <div class="col-md-7 mb-2 mt-2">
                <h2>Projects for {{ account.name }}</h2>
              </div>
              <div class="col-md-3 col-4">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#create-project"
                  class="btn btnpink"
                  title="Create Project"
                >
                  <h4 class="mb-0">Create Project</h4>
                </button>
              </div>
            </div>
          </div>

          <div
            class="
              col-md-11 col-10
              m-3
              home-card
              p-5
              bg-light
              rounded
              elevation-3
              outline
            "
            v-for="p in projects"
            :key="p.id"
          >
            <Project :project="p" />
          </div>
        </div>
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
* {
  font-family: "Catamaran", sans-serif;
  font-family: "Comforter", cursive;
  font-family: "Roboto", sans-serif;
}

.btnpink {
  border: 2px solid rgba(148, 41, 199, 1);
}

.outline {
  padding: 1rem;
  padding: 0.5rem 3rem;
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border: solid 3px transparent;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(101deg, #78e4ff, #ff48fa);
  background-origin: border-box;
  background-clip: content-box, border-box;
  box-shadow: 2px 1000px 1px #fff inset;
}
</style>
