<template>
    <div class="max-w-4xl w-full flex" :class="flexPosition">
        <Transition appear name="fade">
            <div v-show="isTextVisible" class="max-w-3xl flex flex-col gap-4 place-content-center place-items-center">
                <p ref="textDisplay" :class="textStyles" class="whitespace-pre-line">{{ displayedText }}<span
                        class="caret text-gray-400">|</span>
                </p>

                <!-- image -->
                <Transition appear name="scale">
                    <div v-if="isImageVisible"
                        class="relative h-48 w-80 object-cover rounded -rotate-2 shadow hover:scale-110 hover:rotate-0 transition duration-700 bg-gray-400 bg-opacity-25 backdrop-blur-sm overflow-clip">
                        <div v-if="isImageLoading"
                            class="absolute top-0 left-0 w-full h-full flex place-content-center place-items-center z-40 gap-2">
                            <p class="text-xs text-gray-400">Loading our image :&rpar;</p>
                            <UIcon class="w-3 h-3 animate-spin" name="i-heroicons-arrow-path" />
                        </div>
                        <img class="w-full h-full object-cover z-50 cursor-pointer mx-auto" :src="displayedImage"
                            @load="isImageLoading = false" @click="isFullImagePreview = true" />
                    </div>
                </Transition>
            </div>
        </Transition>

        <UModal v-model="isFullImagePreview" :ui="{ background: 'bg-transparent' }">
            <ImagePreview :src="displayedImage" :text="displayedText" />
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';
import { sleep } from '~/utils/timer';

const dataStore = useDataStore()
const { index, message } = storeToRefs(dataStore)

const model = defineModel<string>()
const emits = defineEmits(['done', 'clear', 'start', 'delete'])

const displayedText = ref('')
const displayedImage = ref('')

const isTextVisible = ref(true)
const isImageVisible = ref(false)
const isImageLoading = ref(false)
const isFullImagePreview = ref(false)

let isStillMutating = false

const flexPosition = ref("justify-center")
const textStyles = ref([getTextPosition(), getTextFont()].join(' '))

const textDisplay = ref<HTMLElement | null>(null)

watch(() => dataStore.data.typing.textColor, () => {
    if (textDisplay.value) textDisplay.value.style.color = dataStore.data.typing.textColor
})

watch(message, () => {
    mutateText()
}, { immediate: true })

// apply properties from message to the component
async function mutateText() {
    if (isStillMutating) return

    setEvent('delete')
    isTextVisible.value = false
    isStillMutating = true

    // text deleteion animation
    // while (displayedText.value.length > 0) {
    //     displayedText.value = displayedText.value.slice(0, -1)
    //     await sleep(50)
    // }

    // make sure to check fade transition duration, then add with desired delay amount
    await sleep(1000)

    displayedText.value = ""
    setEvent('clear')
    setEvent('start')

    // update all values here
    flexPosition.value = getFlexPosition()
    textStyles.value = [getTextPosition(), getTextFont()].join(' ')
    isTextVisible.value = true
    isImageVisible.value = (!!message.value.image && message.value.image !== "")
    isImageLoading.value = isImageVisible.value

    if (message.value.image) {
        displayedImage.value = message.value.image.includes("pasteboard.co") ? `https://gcdnb.pbrd.co/images/${message.value.image.split("/").pop()}?o=1` : message.value.image
    } else {
        displayedImage.value = ""
    }

    if (textDisplay.value) textDisplay.value.style.color = message.value.color ?? dataStore.data?.typing.textColor ?? "#FFFFFF"

    for (let c of message.value.text) {
        displayedText.value += c
        await sleep(dataStore.data?.typing.delay ?? 45)
    }

    setEvent('done')
    isStillMutating = false
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
    scale: .3;
}
</style>