<template>
  <div class="w-screen h-screen overflow-hidden ">
    <div class="w-screen h-screen absolute top-0 left-0 -z-10">
      <canvas class="w-screen h-screen" ref="canvas"></canvas>
    </div>

    <div class="w-screen h-screen z-50">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>

    <!-- <Transition name="fade">
      <ClickPrompt v-show="showPrompt" @click="showPrompt = false" />
    </Transition> -->
  </div>
</template>

<script setup lang="ts">
import Starback from 'starback'
import { useDataStore } from './store/dataStore';

const dataStore = useDataStore()
const canvas = ref<HTMLCanvasElement | null>(null)
const showPrompt = ref(true)

dataStore.fetchData()

onMounted(() => {
  if (canvas.value) {
    const starback = new Starback(canvas.value, {
      width: window.innerWidth,
      height: window.innerHeight,
      type: 'dot',
      quantity: 100,
      direction: 20,
      backgroundColor: ['#010d14', '#01141f'],
      randomOpacity: [0.1, 0.8],
      starSize: [0, 2],
    })
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>