<template>
    <div class="w-full flex flex-col gap-2">
        <h3>Bagikan</h3>
        <UFormGroup label="Link">
            <UInput placeholder="My_Example_Message" v-model="link" />
        </UFormGroup>
        <UButton label="Bagikan" block @click="submit()" :loading="isLoading" />
        <p v-show="validationError" class="text-xs text-red-400 font-bold break-words whitespace-pre-line">{{
            validationError }}</p>
        <p class="text-xs text-gray-200 break-words">{{ shareLink }}</p>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';
import { dataSchema } from '~/types/data';

const dataStore = useDataStore()
const validationError = ref("")
const baseUrl = window.location.origin
const link = ref(dataStore.createLink)
const shareLink = computed(() => `${baseUrl}/hi/${link.value}`)
const isLoading = ref(false)

function submit() {
    isLoading.value = true
    validationError.value = ""
    const parse = dataSchema.safeParse(dataStore.data)

    if (!parse.success) {
        validationError.value = `Ada input yang salah...\n${parse.error.errors[0].path.join(" > ")}: ${parse.error.errors[0].message}`
        return
    }

    dataStore.saveToServer()
}

watch(link, () => {
    dataStore.createLink = link.value
})

watch(() => dataStore.saveResult, (saveResult) => {
    if (saveResult) {
        if (saveResult.success) useToast().add({
            title: "Berhasil Disimpan!",
            description: `Untuk melihat hasil, silahkan lihat di ${shareLink.value}`,
            color: 'green',
            icon: "i-heroicons-check-solid",
            actions: [{ label: "Buka", click: () => window.open(shareLink.value) }]
        })
        else useToast().add({
            title: "Gagal disimpan",
            description: saveResult.message,
            color: 'red',
            icon: "i-heroicons-x-solid",
        })
    }

    isLoading.value = false
})
</script>