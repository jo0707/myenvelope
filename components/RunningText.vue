<template>
    <div class="max-w-4xl w-full flex" :class="flexPosition">
        <Transition appear name="fade">
            <div v-show="isTextVisible" class="max-w-3xl flex flex-col gap-4">
                <p class="text-lg">{{ displayedText }}<span class="caret text-gray-400">|</span>
                </p>
                <Transition appear name="scale">
                    <img v-if="isImageVisible"
                        class="h-48 rounded -rotate-2 shadow hover:scale-110 hover:rotate-0 transition duration-700 bg-gray-400 bg-opacity-25 backdrop-blur-sm"
                        :src="displayedImage" />
                </Transition>
            </div>
        </Transition>
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
const flexPosition = ref("justify-center")

watch(message, () => {
    mutateText()
}, { immediate: true })

async function mutateText() {
    setEvent('delete')
    isTextVisible.value = false

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
    isTextVisible.value = true
    isImageVisible.value = message.value.image !== ""
    displayedImage.value = message.value.image

    for (let c of message.value.text) {
        displayedText.value += c
        await sleep(dataStore.data.typing.delay)
    }

    setEvent('done')
}

function getFlexPosition() {
    if (message.value.position === 1) return "justify-start"
    else if (message.value.position === 2) return "justify-center"
    else if (message.value.position === 3) return "justify-end"
    else return "justify-center"
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