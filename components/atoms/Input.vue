<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      class="form-input block w-full text-xs rounded-md"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    type: {
      type: String as PropType<"text" | "number">,
      default: undefined
    },
    placeholder: {
      type: String,
      default: undefined
    }
  },
  methods: {
    onChange(e: unknown) {
      console.log("change");
      this.$emit("click", e);
    }
  }
});
</script>
