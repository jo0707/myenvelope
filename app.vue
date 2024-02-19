<template>
  <div class="relative w-screen h-screen overflow-hidden text-center">
    <div class="w-screen h-screen absolute top-0 left-0">
      <!-- <img src="/img/background.jpg" class="fixed top-0 left-0 w-full h-full -z-50"></img> -->
      <canvas ref="canvas" class="fixed top-0 left-0 w-full h-full -z-40"></canvas>
    </div>

    <Transition name="fade">
      <LoadingScreen class="w-screen h-screen fixed top-0 left-0" v-if="!dataStore.data && !dataStore.error" />
      <ErrorScreen class="w-screen h-screen fixed top-0 left-0" v-else-if="dataStore.error" />

      <div v-else class="w-screen h-screen relative z-50">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </Transition>

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
  if (canvas.value && dataStore.data && starback) {
    starback.config = {
      width: window.innerWidth,
      height: window.innerHeight,
      type: dataStore.data.background.type,
      quantity: dataStore.data.background.starQuantity,
      direction: dataStore.data.background.starAngle,
      backgroundColor: [dataStore.data.background.topColor, dataStore.data.background.bottomColor],
      randomOpacity: dataStore.data.background.starOpacity,
      starSize: dataStore.data.background.starSize,
    }
  }
})

onMounted(() => {
  if (canvas.value) {
    starback = new Starback(canvas.value, {
      width: window.innerWidth,
      height: window.innerHeight,
      type: dataStore.data.background.type,
      quantity: dataStore.data.background.starQuantity,
      direction: dataStore.data.background.starAngle,
      backgroundColor: [dataStore.data.background.topColor, dataStore.data.background.bottomColor],
      randomOpacity: dataStore.data.background.starOpacity,
      starSize: dataStore.data.background.type == "dot" ? dataStore.data.background.starSize : dataStore.data.background.starSize[1],
      // speed: 1,
      // frequency: 5,
      // slope: { x: -1, y: 10 },
      // directionX: 1,
      // spread: -10,
    })
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