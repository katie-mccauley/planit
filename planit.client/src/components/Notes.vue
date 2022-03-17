<template>
  <h4>{{ note.creator.name }}</h4>
  <img class="img-fluid" :src="note.creator.picture" alt="" />
  <h4>{{ note.body }}</h4>
  <i class="mdi mdi-delete selectable" @click="deleteNote"></i>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { notesService } from "../services/NotesService"
import { useRoute } from "vue-router"
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
          await notesService.deleteNote(route.params.id, props.note.id)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>