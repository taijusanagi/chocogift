<template>
  <div class="text-xs text-secondary font-medium">
    <label v-for="(value, i) in values" :key="i" class="inline-flex items-center">
      <input type="radio" name="radio" class="form-radio" />
      <span class="ml-1 mr-4">{{ labels[i] }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
export default Vue.extend({
  props: {
    values: {
      type: Array,
      default: undefined
    },
    labels: {
      type: Array,
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
