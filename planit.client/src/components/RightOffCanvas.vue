<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">Offcanvas right</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <slot name="body"><!--title slot--></slot>
      <slot name="messages"></slot>
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger"

export default {
  props: {
    taskData: {
      type: Object,
      required: false,
    }
  },
  setup(props) {
    return {
      open() {
        try {
          logger.log(props.taskData)
        } catch (error) {
          logger.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>