<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col-2 d-flex justify-content-start ps-0">
        <OffCanvas id="showprojects">
          <template #body>
            <div class="col" v-for="p in projects" :key="p.id">
              <router-link :to="{ name: 'Project', params: { id: p.id } }">
                <h2>{{ p.name }}</h2>
              </router-link>
            </div>
          </template>
        </OffCanvas>
      </div>
      <div class="col-md-6 mb-3">
        <h1>
          {{ activeProject.name }}
          <i
            v-if="account.id == activeProject.creatorId"
            @click="deleteProject"
            title="Delete Project"
            class="mdi mdi-delete selectable text-danger"
          ></i>
        </h1>
        <h3>{{ activeProject.description }}</h3>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-6">
        <h4 class="textpurple text-bold">Sprints</h4>
        <h4>
          Group your tasks into sprints for over-arching collections for better
          organization.
        </h4>
      </div>
      <div class="col-md-2">
        <button
          v-if="account.id == activeProject.creatorId"
          data-bs-toggle="modal"
          data-bs-target="#create-sprint"
          title="Create Sprint"
          class="btn btnpurple"
        >
          Create Sprint
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12" v-for="s in sprints" :key="s.id">
        <Sprint :sprint="s" />
      </div>
    </div>
  </div>
  <Modal id="create-sprint">
    <template #title> Create Sprint </template>
    <template #body><SprintForm /></template>
  </Modal>
</template>


<script>
import { computed, onMounted, watchEffect } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { sprintsService } from "../services/SprintsService"
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
import OffCanvas from "../components/OffCanvas.vue"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
export default {

  setup() {
    const route = useRoute()
    const router = useRouter()
    watchEffect(async () => {
      try {
        if (route.name == "Project") {
          await sprintsService.getAllSprints(route.params.id)
          await projectsService.getProjectById(route.params.id)
        }

      } catch (error) {
        logger.error(error)
      }
    })
    return {
      sprints: computed(() => AppState.sprints),
      projects: computed(() => AppState.projects),
      async deleteProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.deleteProject(route.params.id)
            router.push({ name: 'Home' })
          }

        } catch (error) {
          logger.error(error)
        }
      },
      activeProject: computed(() => AppState.activeProject),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.hsprint {
  height: 30px;
}

* {
  font-family: "Catamaran", sans-serif;
  font-family: "Comforter", cursive;
  font-family: "Roboto", sans-serif;
}

.btnpurple {
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
  height: 70px;
}

.btnpurple:hover {
  box-shadow: none;
  color: white;
}

.textpurple {
  color: #ff48fa;
}
</style>