<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  index: Number,
  show: Boolean
})
</script>

<template>
  <div
      class="my-component"
      :class="{ 'visible': show }"
  >
    <p>Project: {{ index }}{{show}}</p>
  </div>1
</template>

<style scoped>
.my-component {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  position: absolute;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.my-component.visible {
  opacity: 1;
}
</style>