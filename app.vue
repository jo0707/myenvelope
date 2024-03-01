<template>
  <div class="relative w-screen h-screen overflow-hidden text-center">
    <div class="w-screen h-screen absolute top-0 left-0">
      <!-- <img src="/img/background.jpg" class="fixed top-0 left-0 w-full h-full -z-50"></img> -->
      <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-40"></canvas>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Transition name="fade">
      <SplashScreen class="absolute w-full h-full top-0 left-0 z-50" v-show="!splashClicked"
        @click="splashClicked = true" />
    </Transition>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import Starback from 'starback'
import { useDataStore } from './store/dataStore';

const dataStore = useDataStore()
const { splashClicked } = storeToRefs(dataStore)
const canvas = ref<HTMLCanvasElement | null>(null)
let starback: Starback | null = null

watchEffect(() => {
  if (canvas.value && dataStore.data) {
    let config = {
      width: window.innerWidth,
      height: window.innerHeight,
      type: dataStore.data.background.type,
      quantity: dataStore.data.background.starQuantity,
      direction: dataStore.data.background.starAngle,
      backgroundColor: [dataStore.data.background.topColor, dataStore.data.background.bottomColor],
      randomOpacity: dataStore.data.background.starOpacity,
      starSize: dataStore.data.background.type == "dot" ? dataStore.data.background.starSize : dataStore.data.background.starSize[1],
    }

    if (config.type == "line") {
      config.speed = dataStore.data.background.lineSpeed
      config.spread = dataStore.data.background.lineSpread
      config.starColor = [dataStore.data.background.lineColorStart, dataStore.data.background.lineColorStop]
      config.slope = { x: 0, y: 0 }
    }

    if (!starback) starback = new Starback(canvas.value, config)
    else starback.config = config
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #7d7d7d;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c3c3c3;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #d3d3d3;
}
</style>