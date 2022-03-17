<template>
  <div class="row justify-content-center m-3">
    <div class="col-6 bg-light text-dark">
      <div class="row justify-content-center">
        <div class="col-6">
          <h4>
            {{ sprint.name }} <i class="mdi mdi-weight"></i>{{ totalWeight }}
          </h4>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <h3>
            <i
              @click="deleteSprint"
              title="Delete Sprint"
              class="selectable mdi mdi-alpha-x"
            ></i>
          </h3>
        </div>
      </div>
      <div>
        <p>
          Create Task
          <i
            data-bs-toggle="modal"
            title="Create Task"
            :data-bs-target="'#create-task' + sprint.id"
            class="mdi mdi-plus selectable"
          ></i>
        </p>
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
      totalWeight: computed(() => {
        let totalTask = AppState.tasks.filter(t => t.sprintId == props.sprint.id)
        let total = 0
        totalTask.forEach(t => total += t.weight)
        return total
      })
    }
  }
}
</script>


<style lang="scss" scoped>
</style>