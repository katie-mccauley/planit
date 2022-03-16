<template>
  <div class="row justify-content-center m-3">
    <div class="col-6 bg-light text-dark">
      <h4>Weight of tasks {{ tasks.weight }}</h4>
      <i @click="deleteSprint" class="selectable mdi mdi-delete"></i>
      <h2>{{ sprint.name }}</h2>
      <div>
        <i
          data-bs-toggle="modal"
          :data-bs-target="'#create-task' + sprint.id"
          class="mdi mdi-plus selectable"
        ></i>
        <div class="row">
          <div class="col" v-for="t in tasks" :key="t.id">
            <Task :task="t" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="'create-task' + sprint.id">
    <template #title> Create Task </template>
    <template #body><TaskForm :sprintId="sprint.id" /></template>
  </Modal>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import { AppState } from "../AppState"
import { sprintsService } from "../services/SprintsService"
import { logger } from "../utils/Logger"
import { tasksService } from "../services/TasksService"
export default {
  props: {
    sprint: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await tasksService.getAllTasks(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })

    return {
      async deleteSprint() {
        try {
          await sprintsService.deleteSprint(route.params.id, props.sprint.id)
        } catch (error) {
          logger.error(error)
        }
      },
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      sprints: computed(() => AppState.sprints),
      // totalWeight: computed(()=> tasks.weight)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>