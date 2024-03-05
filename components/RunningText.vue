<template>
    <div class="max-w-4xl w-full flex" :class="flexPosition">
        <Transition appear name="fade">
            <div v-show="isTextVisible" class="max-w-3xl flex flex-col gap-4 place-content-center place-items-center">
                <p ref="textDisplay" :class="textStyles" class="whitespace-pre-line">{{ displayedText }}<span
                        ref="caret" class="caret text-gray-400">|</span>
                </p>

                <!-- image -->
                <Transition appear name="scale">
                    <div v-if="isImageVisible"
                        class="relative h-48 w-80 object-cover rounded-sm -rotate-2 bg-gray-200 p-1 pb-4 shadow hover:scale-110 hover:rotate-0 transition duration-700 overflow-visible group">
                        <UIcon
                            class="w-6 h-6 text-red-500 absolute -bottom-2 -left-2 rotate-12 group-hover:-rotate-6 transition duration-700"
                            name="i-heroicons-heart-solid" />

                        <div v-if="isImageLoading"
                            class="absolute top-0 left-0 w-full h-full flex place-content-center place-items-center z-40 gap-2 bg-gray-400">
                            <p class="text-xs text-gray-100">Loading our image :&rpar;</p>
                            <UIcon class="w-3 h-3 animate-spin" name="i-heroicons-arrow-path" />
                        </div>
                        <div
                            class="w-full h-full object-cover relative z-50 flex flex-col gap-1 cursor-pointer mx-auto ">
                            <img class="object-cover z-10 w-full h-full rounded-sm" :src="displayedImage"
                                @load="isImageLoading = false" @click="isFullImagePreview = true" />
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>

        <UModal v-model="isFullImagePreview" :ui="{ background: 'bg-transparent rounded-sm overflow-visible' }">
            <ImagePreview :src="displayedImage" :text="displayedText" />
            <UIcon name="i-heroicons-heart-solid"
                class="w-12 h-12 rotate-[16deg] absolute -left-4 -bottom-4 text-red-500" />
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';
import { sleep } from '~/utils/timer';

const dataStore = useDataStore()
const { message } = storeToRefs(dataStore)

const model = defineModel<string>()
const emits = defineEmits(['done', 'clear', 'start', 'delete'])

const displayedText = ref('')
const displayedImage = ref('')

const isTextVisible = ref(true)
const isImageVisible = ref(false)
const isImageLoading = ref(false)
const isFullImagePreview = ref(false)

let isMutationInterrupted = false
let isMutationBeforeSleep = false

const flexPosition = ref("justify-center")
const textStyles = ref([getTextPosition(), getTextFont()].join(' '))

const textDisplay = ref<HTMLElement | null>(null)
const caret = ref<HTMLElement | null>(null)

watch(() => dataStore.data.typing.textColor, () => {
    if (textDisplay.value) textDisplay.value.style.color = dataStore.data.typing.textColor
})

watch(message, () => {
    mutateText()
}, { immediate: true })

async function mutateText() {
    setEvent('delete')
    if (isMutationBeforeSleep) return

    isMutationInterrupted = true
    isMutationBeforeSleep = true
    isTextVisible.value = false

    // fade transition duration + delay per slide
    await sleep(1000)

    displayedText.value = ""
    isMutationInterrupted = false
    isMutationBeforeSleep = false
    setEvent('clear')
    setEvent('start')

    // update all values here
    flexPosition.value = getFlexPosition()
    textStyles.value = [getTextPosition(), getTextFont()].join(' ')
    isTextVisible.value = true
    isImageVisible.value = (!!message.value.image && message.value.image !== "")
    isImageLoading.value = isImageVisible.value
    displayedImage.value = message.value.image ? `/api/image?url=${message.value.image}` : ""

    if (textDisplay.value) textDisplay.value.style.color = message.value.color ? message.value.color : dataStore.data?.typing.textColor
    if (caret.value) caret.value.style.color = message.value.color ? message.value.color : dataStore.data?.typing.textColor

    for (let c of message.value.text) {
        if (isMutationInterrupted) break
        displayedText.value += c
        await sleep(dataStore.data?.typing.delay ?? 45)
    }

    setEvent('done')
    isMutationInterrupted = false
}

function getFlexPosition() {
    if (message.value.position === 1) return "justify-start"
    else if (message.value.position === 2) return "justify-center"
    else if (message.value.position === 3) return "justify-end"
    else return "justify-center"
}

function getTextPosition() {
    if (message.value.position === 1) return "text-start"
    else if (message.value.position === 2) return "text-center"
    else if (message.value.position === 3) return "text-end"
    else return "text-center"
}

function getTextFont() {
    if (message.value.type == "quote") return "font-[tangerine] text-4xl"
    else return "text-lg"
}

function setEvent(e: 'done' | 'clear' | 'start' | 'delete') {
    emits(e)
    model.value = e
}

</script>

<style scoped>
.caret {
    animation-duration: 1.7s;
    animation-name: popup;
    animation-iteration-count: infinite;
}

@keyframes popup {
    from {
        opacity: 0;
    }

    49% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    to {
        opacity: 1;
    }
}

.fade-enter-active {
    transition: opacity .4s ease;
}

.fade-leave-active {
    transition: opacity .7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active {
    transition: all 1.2s ease;
}

.scale-leave-active {
    transition: all 0s ease;
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    scale: .8;
}
</style>