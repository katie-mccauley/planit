<template>
  <div class="form-check mt-3 bglightgrey rounded shadow">
    <input
      class="form-check-input selectable"
      type="checkbox"
      @change="checked"
      :checked="task.isComplete"
      id="flexCheckDefault"
      title="check task"
    />
    <!-- <label class="form-check-label" for="flexCheckDefault">
      <h4>{{ task.name }}</h4>
    </label> -->
    <h4>
      <i class="mdi mdi-weight"></i>{{ task.weight }} {{ task.name }}
      <i
        v-if="account.id == task.creatorId"
        class="mdi mdi-delete selectable text-danger"
        title="Delete Task"
        @click="deleteTask"
      ></i
      ><i
        v-if="account.id == task.creatorId"
        title="Edit Task"
        class="mdi mdi-pencil textpurple"
        data-bs-toggle="modal"
        :data-bs-target="'#edit-task' + task.id"
      ></i>
    </h4>

    <div>
      <!-- <h3> -->
      <!-- <i
          title="Create Note"
          data-bs-toggle="modal"
          :data-bs-target="'#create-note' + task.id"
          class="mdi mdi-message-bulleted selectable"
        ></i> -->
      <!-- </h3> -->
      <h4>
        <i
          class="mdi mdi-message-bulleted selectable"
          type="button"
          data-bs-toggle="modal"
          :data-bs-target="'#create-note' + task.id"
          aria-controls="offcanvasRight"
          title="Create Note"
          @click="open"
        >
        </i>
      </h4>
      <!-- <RightOffCanvas /> -->
      <!-- <template #body> <NoteForm :taskData="task" /> </template>
        <template #messages>
          <div class="row">
            <div class="col-12" v-for="n in notes" :key="n.id">
              <Notes :note="n" />
            </div>
          </div>
        </template> -->
      <!-- </RightOffCanvas> -->
    </div>
  </div>
  <Modal :id="'create-note' + task.id">
    <template #body>
      <NoteForm :taskData="task" />
      <div class="row bgpurple rounded">
        <div class="col-12 p-3" v-for="n in notes" :key="n.id">
          <Notes :note="n" />
        </div>
      </div>
    </template>
    <!-- <template #messages>
      
    </template> -->
  </Modal>

  <!-- <Modal :id="'create-note' + task.id">
    <template #title> Create Task </template>
    <template #body><NoteForm :taskData="task" /></template>
  </Modal> -->
  <Modal :id="'edit-task' + task.id">
    <template #title> Edit Task </template>
    <template #body><EditTaskForm :editTask="task" /></template>
  </Modal>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRoute } from "vue-router"
import { tasksService } from "../services/TasksService"
import { logger } from "../utils/Logger"
import { AppState } from "../AppState"
import { onMounted } from "@vue/runtime-core"
import { notesService } from "../services/NotesService"
import Pop from "../utils/Pop"
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    onMounted(async () => {
      try {
        await notesService.getAllNotes(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      async checked() {
        try {
          await tasksService.checked(props.task, route.params.id)
        } catch (error) {
          logger.error(error)
        }
      },
      async deleteTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.deleteTask(route.params.id, props.task.id)
          }

        } catch (error) {
          logger.error(error)
        }
      },
      // async getTotalTaskWeight(){

      // }
      notes: computed(() => AppState.notes.filter(n => n.taskId == props.task.id)),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.bglightgrey {
  background-color: rgb(232, 230, 230);
}

.textpurple {
  color: #ff48fa;
}

.bgpurple {
  background-color: rgb(242, 139, 242);
}
</style>