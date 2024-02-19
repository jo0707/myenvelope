<template>
    <div class="w-full absolute bottom-0 flex justify-between place-items-center max-w-sm p-2">
        <TheButton icon="i-heroicons-chevron-left" @click="prev()" />
        <!-- <UInput v-model="index" type="number" class="w-12 text-center" /> -->
        <UButton size="xs" class="opacity-50 border border-gray-400/50"
            :label="`${index + 1} / ${dataStore.data.messages.length}`" color="white" variant="ghost"
            @click="isJumpOpen = true" />
        <TheButton icon="i-heroicons-chevron-right" @click="next()" />

        <UModal v-model="isJumpOpen">
            <UCard>
                <UFormGroup class="flex flex-col gap-2" label="Lompat ke index"
                    :hint="`(max ${dataStore.data.messages.length})`">
                    <div class="flex flex-col gap-2">
                        <UInput type="number" :max="dataStore.data.messages.length" v-model="jumpTo" />
                        <UButton block variant="outline" @click="setIndex()" class="w-full">Ok
                        </UButton>
                    </div>
                </UFormGroup>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
const { index } = storeToRefs(dataStore)

const isJumpOpen = ref(false)
const jumpTo = ref(0)

function next() {
    if (index.value < dataStore.data!.messages.length - 1) index.value++

}
function prev() {
    if (index.value > 0) index.value--
}

function setIndex() {
    index.value = clamp(jumpTo.value, 0, dataStore.data.messages.length - 1)
    isJumpOpen.value = false
}

onMounted(() => {
    document.onkeydown = (e) => {
        if (e.code == 'ArrowLeft') {
            prev()
        }
        else if (e.code == 'ArrowRight') {
            next()
        }
    }
})
</script>