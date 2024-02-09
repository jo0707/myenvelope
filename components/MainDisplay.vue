<template>
    <div class="relative h-full w-full flex place-items-center" :class="flexPosition">
        <Transition appear name="fade">
            <RunningText :text="text" :position="5" v-model="runningTextStatus" @done="" @clear="" @start="" @delete="" />
        </Transition>
        <div class="w-full absolute bottom-0 flex justify-between max-w-xl p-2">
            <TheButton icon="i-heroicons-chevron-left" @click="index--" />
            <TheButton icon="i-heroicons-chevron-right" @click="index++" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';
const dataStore = useDataStore()

let runningTextStatus = ref("done")
let index = ref(0)
let position = ref(2)
let flexPosition = ref(getFlexPosition())

const text = computed(() => {
    let message = dataStore.data?.messages[index.value]
    return (typeof message === "string") ? message : message?.text ?? ""
})

watchEffect(() => {
    let message = dataStore.data?.messages[index.value]
    position.value = message?.position ?? 2
})

watch(runningTextStatus, (status) => {
    if (status == "clear") flexPosition.value = getFlexPosition()
})

function getFlexPosition() {
    if (position.value == 1) return "justify-start"
    else if (position.value == 2) return "justify-center"
    else if (position.value == 3) return "justify-end"
}

onMounted(() => {
    document.onkeydown = (e) => {
        console.log(e.code);

        if (runningTextStatus.value === "clear" || runningTextStatus.value === "done") {
            if (e.code == 'ArrowLeft') {
                if (index.value > 0) index.value--
            }
            else if (e.code == 'ArrowRight') {
                index.value++
                if (index.value == dataStore.data?.messages.length) index.value = 0
            }
        }

    }
})
</script>

