<script setup>
import { computed } from 'vue'

const emit = defineEmits(['select'])

const props = defineProps([
  'theme',
  'info',
  'menuActive'
])

const classObject = computed(() => {
  const c = ['menu-item']

  if(props.menuActive) c.push('-menu-active')
  else c.push('-menu-inactive')

  return c.join(' ')
})

function select() {
  emit('select', props.info.id) 
}

</script>

<template>
  <a
    v-if="info.to"
    :href="info.to" 
    :class="classObject"
    target="_blank"
  >{{ info.name }}</a>
  <button 
    v-if="!info.to"
    :class="classObject"
    @click="select"
  >{{ info.name }}</button>
</template>

<style scoped>

.menu-item {
  appearance: none;
  border: none;
  background-color: transparent;
  padding: 10px 0;
  color: white;
  cursor: pointer;
  transition: background-color 150ms cubic-bezier(0.5, 0.0, 0.2, 1), transform 400ms cubic-bezier(0.5, 0.0, 0.2, 1);
  font-size: 13px;
  font-weight: 500;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.-menu-inactive {
    &:nth-child(1) {
        transform: translateY(10px) scale(1.2, 1.2); 
    }

    &:nth-child(2) {
      transition-delay: 25ms;
      transform: translateY(30px) scale(1.2, 1.2); 
    }

    &:nth-child(3) { 
      transition-delay: 50ms;
      transform: translateY(90px) scale(1.2, 1.2); 
    }
  }
}

</style>
