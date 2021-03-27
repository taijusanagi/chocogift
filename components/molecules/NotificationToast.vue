<template>
  <div class="relative">
    <div
      class="absolute z-1 right-0 mt-20 mr-4 w-64 h-20 shadow rounded-md overflow-hidden transition-opacity ease-in-out"
    >
      <div class="px-3 pt-2 pb-4">
        <div class="flex items-start">
          <div class="flex-1">
            <p class="text-sm font-bold text-secondary">{{type == "error" ? "Error" : "Success"}}</p>
            <p class="mt-1 text-xs text-secondary">{{text}}</p>
          </div>
          <div class="flex-shrink-0 flex">
            <button class="rounded-md inline-flex text-tertiary focus:outline-none">
              <font-awesome-icon icon="times" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    typeof: {
      type: String as PropType<"default" | "error">,
      default: undefined
    },
    text: {
      type: String,
      default: undefined
    }
  }
});
</script>
