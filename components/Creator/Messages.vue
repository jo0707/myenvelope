<template>
    <div>
        <div class="flex flex-col gap-2">
            <p class="text-sm text-gray-200">Upload gambar ke <NuxtLink class="text-sky-400 underline"
                    to="https://pasteboard.co/" target="_blank">pasteboard.co</NuxtLink> dan copy link ke kolom
                gambar</p>
            <p class="text-xs">*Untuk melihat perubahan, silahkan beralih ke slide lain dan kembali lagi</p>

            <!-- message cards -->
            <TransitionGroup tag="ul" name="fade" class="flex flex-col gap-2 relative">
                <li v-for="(message, i) in dataStore.data.messages" class="flex flex-col *:py-1 rounded border p-2 shadow"
                    :key="i">
                    <UFormGroup :label="`#${i + 1}`">
                        <UTextarea v-model="message.text" autoresize placeholder="Masukkan teks disini..." />
                        <template #hint>
                            <div class="flex gap-2">
                                <UButton size="2xs" variant="outline" icon="i-heroicons-chevron-up-solid"
                                    @click="swapUp(i)" />
                                <UButton size="2xs" variant="outline" icon="i-heroicons-chevron-down-solid"
                                    @click="swapDown(i)" />
                                <UButton size="2xs" color="red" icon="i-heroicons-x-mark-solid"
                                    @click="indexToDelete = i" />
                            </div>
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
            </TransitionGroup>

            <UButton icon="i-heroicons-plus" label="New Message" variant="outline" block
                @click="dataStore.data.messages.push(getMessage(''))" />
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

const dataStore = useDataStore()
const isDeleteMessage = ref(false)
const indexToDelete = ref(-1)

watch(indexToDelete, () => {
    isDeleteMessage.value = indexToDelete.value !== -1
})

function swapUp(index: number) {
    if (index === 0) return
    const temp = dataStore.data.messages[index]
    dataStore.data.messages[index] = dataStore.data.messages[index - 1]
    dataStore.data.messages[index - 1] = temp
}

function swapDown(index: number) {
    if (index === dataStore.data.messages.length - 1) return
    const temp = dataStore.data.messages[index]
    dataStore.data.messages[index] = dataStore.data.messages[index + 1]
    dataStore.data.messages[index + 1] = temp
}
</script>

<style scoped>
/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.7s ease;
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scale(.8) translate(0, -48px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
    position: absolute;
}
</style>
