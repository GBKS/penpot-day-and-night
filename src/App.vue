<script setup>
import Landscape from './components/Landscape.vue'
import MenuButton from './components/MenuButton.vue'
import Menu from './components/Menu.vue'
import { ref, onMounted, computed } from 'vue'

const penpotTheme = ref('dark')
const theme = ref(null)
const menuActive = ref(true)
const isInitialized = ref(false)
const hasPalette = ref(null)

const menuOptions = computed(() => {
  const result = ([
    {
      id: 'info',
      name: 'How it works',
      to: 'https://github.com/GBKS/penpot-day-and-night'
    }
  ])

  if(isInitialized.value) {
    if(!hasPalette.value) {
      result.push({
        id: 'create',
        name: 'Create color palette'
      })

      // result.push({
      //   id: 'detect',
      //   name: 'Detect colors'
      // })
    }
  }

  return result
})

function toggle() {
  parent.postMessage({
    type: 'toggle'
  }, '*');
}

function clearColors() {
  parent.postMessage({
    type: 'clear'
  }, '*');
}

function toggleMenu() {
  menuActive.value = !menuActive.value

  getState()
}

function getState() {
  parent.postMessage({
    type: 'state'
  }, '*');
}

const classObject = computed(() => {
  const c = [
    '-' + theme.value,
    '-' + (isInitialized.value ? 'initialized' : 'not-initialized')
  ]

  if(menuActive.value) c.push('-menu-active')

  return c.join(' ')
})

function initPenpotTheme() {
  const url = new URL(window.location.href);
  const theme = url.searchParams.get("theme");
  if(theme) {
    penpotTheme.value = theme
  }
}

function selectMenuOption(optionId) {
  switch(optionId) {
    case 'create':
      parent.postMessage({
        type: 'create'
      }, '*');
      break;
  }
}

onMounted(() => {
  // console.log('Mounted', parent);

  initPenpotTheme()

  window.addEventListener('message', function(event) {
    console.log('Received message', event.data)

    const message = event.data
    if(message) {
      if(message.type === 'state') {
        if(message.data) {
          theme.value = message.data.theme
        }

        // console.log('Received state', message.data)

        if(!isInitialized.value) {
          isInitialized.value = true

          if(!!theme.value) {
            menuActive.value = false
          }
        }

        const colorGroups = message.data.groups
        hasPalette.value = colorGroups && Object.keys(colorGroups).length > 0
        // console.log('haspalette', hasPalette.value)
      } else if(message.type == 'theme') {
        penpotTheme.value = message.data.content
      }
    }
  })

  getState()
})

</script>

<template>
  <main :class="classObject" :data-theme="penpotTheme">
    <Landscape
      :theme="theme"
      :active="!menuActive"
      @click="toggle"
    />
    <Menu 
      :theme="theme"
      :active="menuActive"
      :options="menuOptions"
      @select="selectMenuOption"
      @clearColors="clearColors"
    />
    <MenuButton 
      :theme="theme"
      :active="!menuActive"
      @click="toggleMenu"
    />
  </main>
</template>

<style scoped>

main {
  position: relative;
  width: 100vw;
  height: 100vh;
  /* width: 200px;
  height: 200px; */
  overflow: hidden;
  transition: opacity 500ms ease-in-out;
  
  &[data-theme="dark"] {
    
  }

  &[data-theme="light"] {
    
  }

  &.-not-initialized {
    opacity: 0;
  }
}

</style>
