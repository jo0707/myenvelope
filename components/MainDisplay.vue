<template>
    <div class="relative h-full w-full flex justify-center place-items-center">
        <Transition appear name="fade">
            <RunningText :text="text" :position="5" v-model="runningTextStatus" @done="" @clear="" @start="" @delete="" />
        </Transition>
        <TheNavigation />
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';
const dataStore = useDataStore()
const { index } = storeToRefs(dataStore)

let runningTextStatus = ref("done")

const text = computed(() => {
    let message = dataStore.data?.messages[index.value]
    return (typeof message === "string") ? message : message?.text ?? ""
})
</script>

