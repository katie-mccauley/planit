<template>
  <div class="row justify-content-center m-3">
    <div
      class="col-md-8 bg-light text-dark outline rounded shadow pe-1 p-4 pt-1"
    >
      <div class="row">
        <div class="col-6 mb-2 rounded">
          <h4>
            {{ sprint.name }} <i class="mdi mdi-weight"></i>{{ totalWeight }}
          </h4>
        </div>
        <div class="col-6 d-flex justify-content-end">
          <button
            @click="deleteSprint"
            type="button"
            title="Delete Sprint"
            class="btn-close"
            v-if="account.id == sprint.creatorId"
          ></button>
        </div>
      </div>
      <div>
        <h5 v-if="account.id == sprint.creatorId">
          Create Task
          <i
            data-bs-toggle="modal"
            title="Create Task"
            :data-bs-target="'#create-task' + sprint.id"
            class="mdi mdi-plus selectable"
          ></i>
        </h5>
        <div class="row">
          <div class="col-12" v-for="t in tasks" :key="t.id">
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
import Pop from "../utils/Pop"
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
          if (await Pop.confirm()) {
            await sprintsService.deleteSprint(route.params.id, props.sprint.id)
          }

        } catch (error) {
          logger.error(error)
        }
      },
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId == props.sprint.id)),
      sprints: computed(() => AppState.sprints),
      account: computed(() => AppState.account),
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

.outlineb {
  box-shadow: 0 0 6px 0 rgba(157, 96, 212, 0.5);
  border-bottom: solid 3px transparent;
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