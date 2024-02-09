<template>
    <div class="relative h-full w-full flex justify-center place-items-center">
        <Transition appear name="fade">
            <RunningText :text="text" :position="5" v-model="runningTextStatus" @done="" @clear="" @start="" @delete="" />
        </Transition>
        <div class="w-full absolute bottom-0 flex justify-between max-w-sm p-2">
            <TheButton icon="i-heroicons-chevron-left" @click="prev()" />
            <TheButton icon="i-heroicons-chevron-right" @click="next()" />
        </div>
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

watchEffect(() => {
    let message = dataStore.data?.messages[index.value]
})

function next() {
    if (runningTextStatus.value === "clear" || runningTextStatus.value === "done") {
        if (index.value < dataStore.data.messages.length) index.value++
    }
}
function prev() {
    if (runningTextStatus.value === "clear" || runningTextStatus.value === "done") {
        if (index.value > 0) index.value--
    }
}

onMounted(() => {
    document.onkeydown = (e) => {
        if (e.code == 'ArrowLeft') {
            next()
        }
        else if (e.code == 'ArrowRight') {
            prev()
        }
    }
})
</script>

