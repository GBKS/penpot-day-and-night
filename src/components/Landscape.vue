<script setup>
import { computed, ref } from 'vue'

const props = defineProps([
  'theme',
  'active'
])

const classObject = computed(() => {
  const c = [
    'landscape',
    '-' + props.theme,
    '-' + (props.active ? 'active' : 'inactive')
  ]

  return c.join(' ')
})

const title = computed(() => {
  return props.active ? 'Click to see the moon' : 'Click to see the sun'
})

const stars = ref(null)

function createStars() {
  const result = []

  while(result.length < 100) {
    result.push({
      top: Math.round(Math.random() * 100) + '%',
      left: Math.round(Math.random() * 100) + '%'
    })
  }

  stars.value = result
}

createStars()
</script>

<template>
  <button
    :class="classObject"
    :title="title"
  >
    <div class="night-sky" />
    <div class="stars-wrap">
      <div class="stars">
        <div 
          v-for="(info, index) in stars" 
          :key="index" 
          :style="info"
        />
      </div>
    </div>
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sun-shine-gradient">
          <stop offset="0%" stop-color="#FFF7CB" />
          <stop offset="100%" stop-color="#FFF7CB" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="moon-shine-gradient">
          <stop offset="0%" stop-color="#FFF7CB" />
          <stop offset="100%" stop-color="#FFF7CB" stop-opacity="0" />
        </radialGradient>
      </defs>
      <g class="sun-wrap">
        <circle class="sun-shine" cx="100" cy="75" r="75" opacity="0.5" fill="url('#sun-shine-gradient')"/>
        <circle class="sun" cx="100" cy="75" r="25" fill="#FFF7CB"/>
      </g>
      <g class="moon-wrap">
        <circle class="moon-shine" cx="100" cy="75" r="50" opacity="0.1" fill="url('#moon-shine-gradient')"/>
        <path class="moon" d="M83.5027 79.9997C95.9291 79.9997 106.003 69.9261 106.003 57.4997C106.003 54.6814 105.485 51.9842 104.538 49.498C116.209 51.8366 125.001 62.1418 125.001 74.5005C125.001 88.5838 113.584 100.001 99.5006 100.001C86.6083 100.001 75.9506 90.433 74.2402 78.0108C77.065 79.2885 80.2008 79.9997 83.5027 79.9997Z" fill="#FFFBD9"/>
      </g>
      <g class="mountains">
        <path class="mountain-1" d="M38.0003 127C23.0003 127 16.5003 142.5 0.000289281 142.5C-0.000650883 174.5 0.000289281 230 0.000289281 230H200V124C178.5 123.5 169 132.5 157.5 132.5C146 132.5 138 121.5 124 121.5C110 121.5 100 135 89.5 135C79 135 53.0003 127 38.0003 127Z" fill="#F59A35"/>
        <path class="mountain-2" d="M200 230V133.5C194.5 137 190.5 145 178.5 145C166.5 145 152.5 140 143.5 140C134.5 140 131.5 152 115.5 152C99.5 152 92 145 76 145C60 145 46.5 154.5 32.5 154.5H0V230H200Z" fill="#F46F31"/>
        <path class="mountain-3" d="M200 229.999V152.999C194 152.998 192.5 156.999 185.5 155.499C178.5 153.999 170 145.999 158 146.499C146 146.999 139.5 155.499 133 155.499C126.5 155.499 123.5 152.999 117 155.499C110.5 157.999 61 175.499 42.5 175.499C24 175.499 4.5 167.5 0 166.999V229.999H200Z" fill="#E8353E"/>
        <path class="mountain-4" d="M200.001 230V164.5C197 163.5 194 162 187 163.5C180 165 181 169.5 173.5 169.5C166 169.5 157.501 164.5 152.501 164.5C147.501 164.5 142 167 134 169.5C126 172 120.999 168 111.5 168C102 168 93.4998 169.5 82.4998 173C71.4998 176.5 61.0005 161 53.0005 159.5C45.0005 158.001 37.0005 159.5 33.5005 159.5C30.0005 159.5 22.5005 151.499 18.0005 150C13.5005 148.502 6.5 147.501 0.000467877 150C-0.000584847 162.5 0.000467877 230 0.000467877 230H200.001Z" fill="#C42F55"/>
        <path class="mountain-5" d="M200 230V170.5C200 170.5 191 170.5 187.5 171.5C184 172.5 175.5 176 172.5 176C169.5 176 157.5 173 151.5 173C145.5 173 139.5 177.5 136 177C132.5 176.5 119 175.5 114 176C109 176.5 49 184 49 184L50.5 230H200Z" fill="#94244A"/>
        <path class="mountain-6" d="M200 230V182C190 183.999 186 188 175.5 188C165 187.999 148.5 183 140.5 183C132.5 183 127.5 186 120 183C112.5 179.999 93.0002 168.5 84.0002 168.5C75.0002 168.499 61.0002 175 51.0002 173C41.0002 170.999 26.0002 158 20.0002 157.5C14.0002 157 6.50022 156.999 0.000221279 160V230H200Z" fill="#44336B"/>
        <path class="mountain-7" d="M13 170C7.5 170 0 172 0 172V230H159V209.5C159 209.5 134.5 209.5 119.5 203.5C104.5 197.5 92 187 87 186.5C82 186 80.5 188.5 76.5 188C72.5 187.5 65.5 183 60.5 183C55.5 183 47.5 184 41.5 183C35.5 182 18.5 170 13 170Z" fill="#AB356A"/>
        <path class="mountain-8" d="M12 180.5C7 178 0 171.5 0 171.5V230H115V212C115 212 101 217 90.5 212C80 207 66 193.5 62 193.5C58 193.5 51 195.5 46 193.5C41 191.5 33.5 182 30 180.5C26.5 179 17 183 12 180.5Z" fill="#813370"/>
        <path class="mountain-9" d="M200 230V178.5C200 178.5 191 186.5 184.5 186.5C178 186.5 165.5 179.5 159 181C152.5 182.5 139.5 193.5 134 193.5C128.5 193.5 115 186.5 108.5 188C102 189.5 97 196.5 90 197C83 197.5 70 195.5 65 198C60 200.5 52 207 45 207H16L17.5 230H200Z" fill="#EE693C"/>
        <path class="mountain-10" d="M200 230V176.5C184 182 187 191.5 172.5 195C158 198.5 155 192 146.5 195C138 198 130 206.5 123.5 206C117 205.5 108.5 199.5 98.5 201.5C88.5 203.5 77 219.5 66.5 219.5H42.5L45.5 230H200Z" fill="#E12E56"/>
      </g>
    </svg>
  </button>
</template>

<style scoped>

.landscape {
  position: relative;
  background-image: linear-gradient(#EB5775, #FBE366 50%);
  width: 100%;
  height: 100%;
  appearance: none;
  border-width: 0;
  padding: 0;

  .night-sky {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
    transition: opacity 400ms ease-in-out;
    background-image: linear-gradient(#0D1125, #172154);
  }

  .stars-wrap {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    opacity: 0;
    transition: opacity 400ms ease-in-out;

    .stars {
      position: relative;
      width: 100%;
      height: 100%;

      > div {
        position: absolute;
        width: 1px;
        height: 1px;
        background-color: #FFF7CB;
        border-radius: 50%;

        &:nth-child(5n) { opacity: 0.5; }
        &:nth-child(3n+1) { opacity: 0.3; }
      }
    }
  }

  svg {
    position: relative;
    z-index: 3;

    .sun-wrap {
      transform-origin: 100px 200px;
      transition: all 600ms ease-in-out;
    }

    .moon-wrap {
      transform-origin: 100px 200px;
      transition: all 600ms ease-in-out;
    }

    .mountains {
      > * {
        transition: fill 350ms ease-in-out;
      }

      .mountain-1 { transition-delay: 25ms; }
      .mountain-2 { transition-delay: 50ms; }
      .mountain-3 { transition-delay: 75ms; }
      .mountain-4 { transition-delay: 100ms; }
      .mountain-5 { transition-delay: 125ms; }
      .mountain-6 { transition-delay: 150ms; }
      .mountain-7 { transition-delay: 175ms; }
      .mountain-8 { transition-delay: 200ms; }
      .mountain-9 { transition-delay: 225ms; }
      .mountain-10 { transition-delay: 250ms; }
    }
  }

  &.-Day {
    svg {
      .moon-wrap {
        transform: rotate(90deg);
        opacity: 0;
      }
    }
  }

  &.-Night {
    .night-sky,
    .stars-wrap {
      opacity: 1;
    }

    svg {
      .sun-wrap {
        transform: rotate(-90deg);
        opacity: 0;
      }
    }

    .mountains {
      .mountain-1 { fill: #151838; transition-delay: 250ms; }
      .mountain-2 { fill: #341D4B; transition-delay: 225ms; }
      .mountain-3 { fill: #231F48; transition-delay: 200ms; }
      .mountain-4 { fill: #2A2E71; transition-delay: 175ms; }
      .mountain-5 { fill: #06314E; transition-delay: 150ms; }
      .mountain-6 { fill: #19214C; transition-delay: 125ms; }
      .mountain-7 { fill: #3344; transition-delay: 100ms; }
      .mountain-8 { fill: #0A3B5A; transition-delay: 75ms; }
      .mountain-9 { fill: #1C2F71; transition-delay: 50ms; }
      .mountain-10 { fill: #0D1248; transition-delay: 25ms; }
    }
  }

  &.-active {
    cursor: pointer;
  }
}

</style>
