<template>
    <div>
        <div class="flex flex-col divide-y divide-gray-400/50 *:py-2">
            <UFormGroup label="Warna Langit Atas">
                <div class="flex gap-2">
                    <UInput class="grow" type="text" icon="i-heroicons-swatch-solid"
                        v-model="dataStore.data.background.topColor" />
                    <InputColorPicker v-model="dataStore.data.background.topColor" />
                </div>
            </UFormGroup>
            <UFormGroup label="Warna Langit Bawah">
                <div class="flex gap-2">
                    <UInput class="grow" type="text" icon="i-heroicons-swatch-solid"
                        v-model="dataStore.data.background.bottomColor" />
                    <InputColorPicker v-model="dataStore.data.background.bottomColor" />
                </div>
            </UFormGroup>
            <!-- <UFormGroup label="Bentuk">
                <div class="flex gap-2">
                    <URadioGroup :options="starOptions" v-model="dataStore.data.background.type" />
                </div>
            </UFormGroup> -->
            <UFormGroup label="Jumlah Bintang" :hint="dataStore.data.background.starQuantity.toString()">
                <URange icon="i-heroicons-anglec-solid" :max="5000" v-model="dataStore.data.background.starQuantity" />
            </UFormGroup>
            <UFormGroup label="Arah Bintang" :hint="`${dataStore.data.background.starAngle}°`">
                <URange icon="i-heroicons-anglec-solid" :max="360" v-model="dataStore.data.background.starAngle" />
            </UFormGroup>

            <UFormGroup label="Kecerahan Bintang"
                :hint="`${(dataStore.data.background.starOpacity[0] * 100).toPrecision(3)}% - ${(dataStore.data.background.starOpacity[1] * 100).toPrecision(3)}%`">
                <div class="flex gap-2">
                    <URange icon="i-heroicons-anglec-solid" :step="0.01" :min="0" :max="1"
                        v-model="dataStore.data.background.starOpacity[0]" />
                    <URange icon="i-heroicons-anglec-solid" :step="0.01" :min="0" :max="1"
                        v-model="dataStore.data.background.starOpacity[1]" />
                </div>
            </UFormGroup>
            <UFormGroup label="Ukuran Bintang"
                :hint="`${(dataStore.data.background.starSize[0])} - ${(dataStore.data.background.starSize[1])}`">
                <div class="flex gap-2">
                    <URange icon="i-heroicons-anglec-solid" :step="0.2" :min="0" :max="15"
                        v-model="dataStore.data.background.starSize[0]" />
                    <URange icon="i-heroicons-anglec-solid" :step="0.2" :min="0" :max="15"
                        v-model="dataStore.data.background.starSize[1]" />
                </div>
            </UFormGroup>
        </div>

        <UButton label="Muat Ulang" @click="reload" block class="mt-2" size="xs" />
        <p class="text-xs">*Untuk melihat perubahan silahkan refresh halaman, data aman tersimpan kok :&rpar;</p>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()

const starOptions = [{
    value: 'dot',
    label: 'Titik'
}, {
    value: 'line',
    label: 'Garis'
}]

function reload() {
    if (location) location.reload()
}

watchEffect(() => {
    if (dataStore.data.background.starQuantity > 5000) dataStore.data.background.starQuantity = 5000
})
</script>