<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2 d-flex justify-content-start">
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
    </div>
    <div class="row justify-content-center">
      <div class="col-6 mb-3">
        <h3>
          {{ activeProject.name }}
          <i @click="deleteProject" class="mdi mdi-delete selectable"></i>
        </h3>
        <h5>{{ activeProject.description }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col-7 d-flex justify-content-end">
        <button
          data-bs-toggle="modal"
          data-bs-target="#create-sprint"
          class="btn btn-success"
        >
          Create Sprint
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-10" v-for="s in sprints" :key="s.id">
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
          await projectsService.deleteProject(route.params.id)
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error(error)
        }
      },
      activeProject: computed(() => AppState.activeProject)
    }
  }
}
</script>


<style lang="scss" scoped>
.hsprint {
  height: 30px;
}
</style>