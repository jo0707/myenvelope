<template>
  <div class="relative w-screen h-screen overflow-hidden text-center">
    <div ref="canvasWrapper" class="w-screen h-screen absolute top-0 left-0 -z-10">
      <canvas class="w-screen h-screen"></canvas>
    </div>

    <Transition name=" fade">
      <LoadingScreen class="w-screen h-screen fixed top-0 left-0 z-50" v-if="!dataStore.data && !dataStore.error" />

      <ErrorScreen class="w-screen h-screen fixed top-0 left-0 z-50" v-else-if="dataStore.error" />

      <div v-else class="w-screen h-screen z-50">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </div>
    </Transition>

    <Transition name="fade">
      <SplashScreen class="absolute w-full h-full top-0 left-0" v-show="!splashClicked" @click="splashClicked = true" />
    </Transition>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import Starback from 'starback'
import { useDataStore } from './store/dataStore';

const dataStore = useDataStore()
const { splashClicked } = storeToRefs(dataStore)
const canvasWrapper = ref<HTMLDivElement | null>(null)
let starback: Starback | null = null

watchEffect(() => {
  if (canvasWrapper.value && dataStore.data) {
    // starback = null

    // if (canvasWrapper.value.firstChild) {
    //   canvasWrapper.value.firstChild.remove()
    //   const cvs = document.createElement("canvas")
    //   cvs.classList.add("w-screen", "h-screen")
    //   canvasWrapper.value.appendChild(cvs)
    // }

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
  if (canvasWrapper.value) {
    starback = new Starback((canvasWrapper.value.firstChild as HTMLCanvasElement), {
      width: window.innerWidth,
      height: window.innerHeight,
      type: dataStore.data.background.type,
      quantity: dataStore.data.background.starQuantity,
      direction: dataStore.data.background.starAngle,
      backgroundColor: [dataStore.data.background.topColor, dataStore.data.background.bottomColor],
      randomOpacity: dataStore.data.background.starOpacity,
      starSize: dataStore.data.background.starSize,
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
</style>