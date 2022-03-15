<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <h2>This is where the sprints go</h2>
      </div>
    </div>
  </div>
</template>


<script>
import { onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import { sprintsService } from "../services/SprintsService"
import { useRoute } from "vue-router"
export default {

  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await sprintsService.getAllSprints(route.params.id)
      } catch (error) {
        logger.error(error)
      }
    })
    return {

    }
  }
}
</script>


<style lang="scss" scoped>
</style>