<template>
    <div class="bg-gray-900/80 backdrop-blur-sm shadow rounded-lg flex flex-col gap-2 p-4">
        <h1>Desain Pesanmu</h1>

        <UAccordion :items="items" variant="outline" size="xs">
            <template #personalization>
                <div>
                    <UFormGroup label="Nama Sapaan">
                        <UInput icon="i-heroicons-user-circle-solid" v-model="dataStore.data.name" maxlength="64" />
                    </UFormGroup>
                </div>
            </template>

            <template #background>
                <div class="flex flex-col divide-y divide-gray-400/50 *:py-2">
                    <UFormGroup label="Warna Langit Atas">
                        <div class="flex gap-2">
                            <UInput class="grow" type="text" icon="i-heroicons-swatch-solid"
                                v-model="dataStore.data.background.topColor" />
                            <input type="color" class="rounded " v-model="dataStore.data.background.topColor" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Warna Langit Bawah">
                        <div class="flex gap-2">
                            <UInput class="grow" type="text" icon="i-heroicons-swatch-solid"
                                v-model="dataStore.data.background.bottomColor" />
                            <input type="color" class="rounded " v-model="dataStore.data.background.bottomColor" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Bentuk">
                        <div class="flex gap-2">
                            <URadioGroup :options="starOptions" v-model="dataStore.data.background.type" />
                        </div>
                    </UFormGroup>
                    <UFormGroup label="Jumlah Bintang" :hint="dataStore.data.background.starQuantity.toString()">
                        <URange icon="i-heroicons-anglec-solid" :max="5000"
                            v-model="dataStore.data.background.starQuantity" />
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

                <p class="text-xs">*Untuk melihat perubahan silahkan refresh halaman, data aman tersimpan kok :&rpar;</p>
            </template>

            <template #music>
                <div class="flex flex-col *:py-1">
                    <UFormGroup label="Lagu">
                        <URadioGroup v-model="dataStore.data.music.id" :options="songOptions" />
                    </UFormGroup>
                    <UFormGroup label="Volume" :hint="`${dataStore.data.music.volume}%`">
                        <URange icon="i-heroicons-speaker-wave-solid" v-model="dataStore.data.music.volume" :min="0"
                            :max="100" />
                    </UFormGroup>
                    <UCheckbox label="Putar Otomatis" v-model="dataStore.data.music.autoplay" />
                    <UCheckbox label="Ulang Otomatis" v-model="dataStore.data.music.loop" />
                </div>
            </template>

            <template #typing>
                <div class="flex flex-col divide-y divide-gray-400/50 *:py-2">
                    <UFormGroup label="Kecepatan Ketik" :hint="`${dataStore.data.typing.delay}ms / karakter`">
                        <URange icon="i-heroicons-anglec-solid" :max="500" v-model="dataStore.data.typing.delay" />
                    </UFormGroup>
                    <UFormGroup label="Warna Teks">
                        <div class="flex gap-2">
                            <UInput class="grow" type="text" icon="i-heroicons-swatch-solid"
                                v-model="dataStore.data.typing.textColor" />
                            <input type="color" class="rounded " v-model="dataStore.data.typing.textColor" />
                        </div>
                    </UFormGroup>
                </div>
            </template>

            <template #messages>
                <div class="flex flex-col gap-2">
                    <p class="text-xs">*Untuk melihat perubahan, silahkan beralih ke slide lain dan kembali lagi</p>
                    <p class="text-xs">*Upload gambar ke <NuxtLink class="text-sky-400 underline"
                            to="https://pasteboard.co/" target="_blank">pasteboard.co</NuxtLink> dan copy link ke kolom
                        gambar</p>

                    <ul class="flex flex-col gap-2">
                        <li v-for="(message, i) in dataStore.data.messages"
                            class="flex flex-col *:py-1 rounded border border-gray-400/80 p-2">
                            <UFormGroup :label="`Teks ke-${i + 1}`">
                                <UTextarea v-model="message.text" autoresize placeholder="Masukkan teks disini..." />
                                <template #hint>
                                    <UButton size="2xs" color="red" variant="outline" icon="i-heroicons-x-mark-solid"
                                        @click="indexToDelete = i" />
                                </template>
                            </UFormGroup>
                            <UFormGroup>
                                <div class="flex justify-between">
                                    <URadio label="Kiri" value="1" v-model="message.position" />
                                    <URadio label="Tengah" value="2" v-model="message.position" />
                                    <URadio label="Kanan" value="3" v-model="message.position" />
                                </div>
                            </UFormGroup>
                            <UFormGroup label="Gambar">
                                <UInput v-model="message.image" size="xs" placeholder="https://pasteboard.co/..." />
                            </UFormGroup>
                            <UFormGroup label="Warna">
                                <div class="flex gap-2">
                                    <UInput size="xs" class="grow" type="text" v-model="message.color"
                                        :placeholder="dataStore.data.typing.textColor" />
                                    <input type="color" class="rounded " v-model="message.color" />
                                </div>
                            </UFormGroup>
                            <UFormGroup label="Gaya Teks">
                                <USelect :options="['text', 'quote']" v-model="message.type" />
                            </UFormGroup>
                        </li>
                    </ul>

                    <UButton icon="i-heroicons-plus" label="New Message" variant="outline" block
                        @click="dataStore.data.messages.push(getMessage(''))" />
                </div>
            </template>
        </UAccordion>

        <UDivider />

        <div class="w-full flex flex-col gap-2">
            <h3>Bagikan</h3>
            <UFormGroup label="Nama Link">
                <UInput placeholder="My_Example_Message" v-model="link" />
            </UFormGroup>
            <UButton label="Bagikan" block @click="submit()" />
            <p v-show="validationError" class="text-xs text-red-400 font-bold break-words whitespace-pre-line">{{ validationError }}</p>
            <p class="text-xs text-gray-200 break-words">{{ `https://envelope.jooo.my.id/hi/${dataStore.createLink}` }}</p>
        </div>

        <UModal v-model="isDeleteMessage">
            <UCard class="text-center">
                <p>Yakin ingin menghapus pesan ini?</p>
                <div class="grid grid-cols-2 gap-2">
                    <UButton variant="outline" block label="Batal" @click="indexToDelete = -1" />
                    <UButton variant="outline" block label="Hapus" color="red"
                        @click="dataStore.data.messages.splice(indexToDelete, 1); indexToDelete = -1" />
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
import { useDataStore, getMessage } from '~/store/dataStore';
import { dataSchema } from '~/types/data';

const items = [{
    label: 'Personalisasi',
    slot: "personalization",
    icon: 'i-heroicons-user-circle-solid',
    defaultOpen: true,
}, {
    label: 'Latar Belakang',
    slot: "background",
    icon: 'i-heroicons-photo-solid',
}, {
    label: 'Musik',
    slot: "music",
    icon: 'i-heroicons-musical-note-solid',
}, {
    label: 'Gaya Ketik',
    slot: "typing",
    icon: 'i-heroicons-pencil-square-solid',
}, {
    label: 'Pesan',
    slot: "messages",
    icon: 'i-heroicons-envelope-solid',
},]

const starOptions = [{
    value: 'dot',
    label: 'Titik'
}, {
    value: 'line',
    label: 'Garis'
}]

const songOptions = computed<{ value: number, label: string }[]>(() => {
    const arr: { value: number, label: string }[] = []

    songTitles.forEach((title, index) => {
        arr.push({ value: index, label: title })
    })

    return arr
})

const dataStore = useDataStore()
const isDeleteMessage = ref(false)
const indexToDelete = ref(-1)
const link = ref(dataStore.createLink)
const validationError = ref("")

function submit() {
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

watch(indexToDelete, () => {
    isDeleteMessage.value = indexToDelete.value !== -1
})

watchEffect(() => {
    if (dataStore.saveResult) {
        if (dataStore.saveResult.success) useToast().add({
            title: "Berhasil Disimpan!",
            description: "Kamu sudah bisa membagikan link yang tertera diatas ;)",
            color: 'green',
            icon: "i-heroicons-check-solid"
        })
    }
})

watchEffect(() => {
    if (dataStore.data.background.starQuantity > 5000) dataStore.data.background.starQuantity = 5000
})
</script>