<script setup>
import { computed } from 'vue'

const emit = defineEmits(['close'])

const props = defineProps([
  'active'
])

const classObject = computed(() => {
  const c = [
    'tip',
    '-' + (props.active ? 'active' : 'inactive')
  ]

  return c.join(' ')
})

function close() {
  emit('close')
}
</script>

<template>
  <div :class="classObject">
    <p>Apply the new colors. Then click the landscape to switch day & night.</p>
    <button @click="close">Got it</button>
  </div>
</template>

<style scoped>
.tip {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 15px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  box-sizing: border-box;
  transition: all 400ms cubic-bezier(0.5, 0.0, 0.2, 1);
  -webkit-backdrop-filter: blur(10px);  

  p {
    color: white;
    font-size: 14px;
    line-height: 1.6;
    text-align: center;
    font-weight: 600;
  }

  button {
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
    background-color: rgba(255, 255, 255, 0.05);

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  &.-inactive {
    pointer-events: none;
    opacity: 0;

    .title {
      transform: translateY(-30px) scale(1.2, 1.2);
    }
  }

  &.-active {
    
  }
}
</style>
