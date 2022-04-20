<template>
  <div class="row text-dark">
    <div class="col-md-1 col-12">
      <img class="img-fluid cropped" :src="note.creator.picture" alt="" />
    </div>
    <div class="col-md-2 col-5 d-flex align-items-end">
      <h6>{{ note.creator.name }}:</h6>
    </div>
    <div class="col-md-6 col-7 d-flex align-items-end">
      <h6>
        {{ note.body }}
        <i
          v-if="account.id == note.creatorId"
          class="mdi mdi-delete selectable"
          title="Delete Note"
          @click="deleteNote"
        ></i>
      </h6>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { notesService } from "../services/NotesService"
import { useRoute } from "vue-router"
import Pop from "../utils/Pop"
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      async deleteNote() {
        try {
          if (await Pop.confirm()) {
            await notesService.deleteNote(route.params.id, props.note.id)
          }

        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.cropped {
  height: 50px;
  max-width: 50px;
  border-radius: 5%;
}
</style>