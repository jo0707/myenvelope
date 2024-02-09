<template>
    <div>
        <Transition appear name="fade">
            <p v-show="isVisible" class="text-lg">{{ displayedText }}<span class="caret text-gray-400">|</span></p>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { sleep } from '~/utils/timer';

const model = defineModel<string>()
const emits = defineEmits(['done', 'clear', 'start', 'delete'])
const text = defineModel<string>('text')
const position = defineModel<number>('posiiton')
const displayedText = ref('')
const writeDelay = ref(55)
const isVisible = ref(true)

watch(text, () => {
    mutateText()
}, { immediate: true })

async function mutateText() {
    setEvent('delete')
    isVisible.value = false

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
    isVisible.value = true

    for (let c of text.value!) {
        displayedText.value += c
        await sleep(writeDelay.value)
    }

    setEvent('done')
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
    transition: opacity .2s ease;
}

.fade-leave-active {
    transition: opacity .7s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>