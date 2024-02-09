<template>
    <div class="w-full text-center">
        <audio ref="audio" @complete="" @timeupdate="(e) => onTimeUpdate(e)">
            <source src="/soundtrack.mp3" type="audio/mp3">
        </audio>

        <div class="flex flex-col gap-1">
            <p class="text-xs">Ella Fitzgerald - Misty</p>
            <Transition appear name="subtitle">
                <p v-if="showSubtitle" class="text-xs text-gray-400">{{ currentSubtitle }}</p>
            </Transition>
            <button class="text-gray-400 hover:text-opacity-70" @click="isPlaying = !isPlaying">
                <UIcon class="h-4 w-4" v-if="!isPlaying" name="i-heroicons-play-solid" />
                <UIcon class="h-4 w-4" v-else name="i-heroicons-pause-solid" />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
const { splashClicked } = storeToRefs(dataStore)

const audio = ref<HTMLAudioElement | null>(null)
const subtitles = ref<Subtitle[]>([])
const isPlaying = ref(false)
const currentSubtitle = ref("")
const showSubtitle = ref(false)

watch(currentSubtitle, (newVal) => {
    showSubtitle.value = false
    setTimeout(() => {
        showSubtitle.value = !!newVal
    }, 200);
})

watch(splashClicked, (newVal) => {
    if (newVal) isPlaying.value = true
})

watchEffect(() => {
    if (audio.value) {
        if (isPlaying.value) {
            audio.value.play()
        } else {
            audio.value.pause()
        }
    }
})

function onTimeUpdate(e: Event) {
    const timestamp = audio.value?.currentTime ?? 0
    currentSubtitle.value = subtitles.value.find(subtitle => {
        return timestamp >= subtitle.start && timestamp <= subtitle.end
    })?.text ?? ""
}

onMounted(async () => {
    audio.value!.volume = 0.7
    subtitles.value = await parseSRT("subtitle.srt")
})
</script>

<style scoped>
.subtitle-enter-active,
.subtitle-leave-active {
    transition: opacity 1s ease;
}

.subtitle-enter-from,
.subtitle-leave-to {
    opacity: 0;
}
</style>