<template>
  <div class="row">
    <div class="col-12">
      <img class="img-fluid cropped" :src="note.creator.picture" alt="" />
      <h4>{{ note.creator.name }}</h4>
    </div>
  </div>

  <h6>
    {{ note.body }}
    <i
      v-if="account.id == note.creatorId"
      class="mdi mdi-delete selectable"
      title="Delete Note"
      @click="deleteNote"
    ></i>
  </h6>
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