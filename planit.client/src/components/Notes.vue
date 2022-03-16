<template>
  <h4>{{ account.name }}</h4>
  <img class="img-fluid" :src="account.picture" alt="" />
  <h4>{{ note.body }}</h4>
  <i class="mdi mdi-delete selectable" @click="deleteNote"></i>
</template>


<script>
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { notesService } from "../services/NotesService"
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      // async deleteNote(){
      //   try {
      //     await notesService.deleteNote()
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>