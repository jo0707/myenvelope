<template>
    <div>
        <div class="flex flex-col divide-y divide-gray-400/50 *:py-2">
            <UFormGroup :label="$t('song')">
                <URadioGroup v-model="dataStore.data.music.id" :options="songOptions"
                    :uiRadio="{ container: 'items-start' }" />
            </UFormGroup>
            <UFormGroup :label="$t('volume')" :hint="`${dataStore.data.music.volume}%`">
                <URange icon="i-heroicons-speaker-wave-solid" v-model="dataStore.data.music.volume" :min="0"
                    :max="100" />
            </UFormGroup>
            <UCheckbox :label="$t('autoplay')" v-model="dataStore.data.music.autoplay" />
            <UCheckbox :label="$t('autoreplay')" v-model="dataStore.data.music.loop" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()

const songOptions = computed<{ value: number, label: string }[]>(() => {
    const arr: { value: number, label: string }[] = []

    songTitles.forEach((title, index) => {
        arr.push({ value: index, label: title })
    })

    return arr
})

</script>