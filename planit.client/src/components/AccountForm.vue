<template>
  <form
    class="
      bg-grey
      darken-20
      justify-content-center
      elevation-3
      shadow
      col-8
      p-2
      m-5
    "
    @submit.prevent="editAccount"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Email: </label>
      <input
        v-model="editable.email"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Title....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Name: </label>
      <input
        v-model="editable.name"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Name....."
      />
    </div>
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Picture: </label>
      <input
        v-model="editable.picture"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
        placeholder="Image Url....."
      />
    </div>
    <div class="col-12 d-flex justify-content-end">
      <button data-bs-dismiss="modal" class="btn btn-primary">edit</button>
    </div>
  </form>
</template>


<script>
import { ref } from "@vue/reactivity"
import { accountService } from "../services/AccountService"
import { logger } from "../utils/Logger"
import { watchEffect } from "@vue/runtime-core"
export default {
  props: {
    accountForm: {
      type: Object,
      required: false,
    }
  },
  setup(props) {
    const editable = ref({})
    // watchEffect(() => {
    //   logger.log("this is the watch effecyt for edit account")
    //   editable.value = props.accountForm
    // })
    return {
      editable,
      async editAccount() {
        try {

          await accountService.editAccount(editable.value)
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