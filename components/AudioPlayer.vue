<template>
    <div class="w-full text-center">
        <audio ref="audio" @timeupdate="onTimeUpdate()">
            <source :src="`/music/${dataStore.data.music.id}.mp3`" type="audio/mp3">
        </audio>

        <div class="flex flex-col gap-1">
            <p class="text-xs">{{ dataStore.songTitle }}</p>
            <Transition appear name="subtitle">
                <p v-if="showSubtitle" class="text-xs text-gray-400">{{ currentSubtitle }}</p>
            </Transition>
            <button class="text-gray-400 hover:text-opacity-70 w-min mx-auto flex place-content-center"
                @click="isPlaying = !isPlaying">
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
    if (newVal && dataStore.data.music.autoplay) isPlaying.value = true
})

watch(() => dataStore.data.music.id, () => {
    if (audio.value) {
        audio.value.load()
        audio.value.play()
    }
})

watchEffect(() => {
    if (audio.value) {
        if (isPlaying.value) {
            audio.value.play()
        } else {
            audio.value.pause()
        }

        audio.value!.volume = dataStore.data.music.volume / 100
    }
})

function onTimeUpdate() {
    const timestamp = audio.value?.currentTime ?? 0
    currentSubtitle.value = subtitles.value.find(subtitle => {
        return timestamp >= subtitle.start && timestamp <= subtitle.end
    })?.text ?? ""
}

onMounted(async () => {
    subtitles.value = await parseSRT(dataStore.data.music.id)

    audio.value!.onended = () => {
        isPlaying.value = false

        if (dataStore.data.music.loop) {
            setTimeout(() => {
                isPlaying.value = true
            }, 2000);
        }
    }
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