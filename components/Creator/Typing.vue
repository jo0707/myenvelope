<template>
    <div>
        <div class="flex flex-col divide-y divide-gray-400/50 *:py-2">
            <UFormGroup :label="$t('typingDelay')" :hint="`${dataStore.data.typing.delay}ms / karakter`">
                <URange icon="i-heroicons-anglec-solid" :max="500" v-model="dataStore.data.typing.delay" />
            </UFormGroup>
            <UFormGroup :label="$t('textColor')">
                <div class="flex gap-2">
                    <UInput class="grow" type="text" icon="i-heroicons-swatch-solid"
                        v-model="dataStore.data.typing.textColor" />
                    <input type="color" class="rounded " v-model="dataStore.data.typing.textColor" />
                </div>
            </UFormGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
</script>