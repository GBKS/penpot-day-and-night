<script setup>
import { computed } from 'vue'

const props = defineProps([
  'theme',
  'active'
])

const classObject = computed(() => {
  const c = ['menu-button']

  if(props.active) c.push('-active')
  else c.push('-inactive')

  return c.join(' ')
})

</script>

<template>
  <button
    :class="classObject"
    title="Toggle menu"
  >
    <div class="wrap">
      <div class="dot" />
      <div class="dot" />
      <div class="dot" />

      <div class="line" />
      <div class="line" />
    </div>
  </button>
  
</template>

<style scoped>

.menu-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  z-index: 15;
  appearance: none;
  padding: 0;
  background-color: transparent;
  border: none;
  opacity: 0.25;
  transition: all 150ms ease-in-out;
  cursor: pointer;

  .wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .dot {
    position: absolute;
    width: 4px;
    height: 4px;
    top: 13px;
    background-color: white;
    border-radius: 50%;

    &:nth-child(1) {
      left: 6px;
    }

    &:nth-child(2) {
      left: 13px;
    }

    &:nth-child(3) {
      left: 20px;
    }
  }

  .line {
    position: absolute;
    width: 14px;
    height: 2px;
    top: 14px;
    left: 8px;
    background-color: white;
    border-radius: 1px;

    &:nth-child(4) {
      transform: rotate(-45deg);
    }

    &:nth-child(5) {
      transform: rotate(45deg);
    }
  }

  &:hover {
    opacity: 1;
  }

  &.-active {
    .line { opacity: 0; }
  }

  &.-inactive {
    .dot { opacity: 0; }
  }
}

</style>
