<template>
    <div class="h-screen flex flex-col">
        <main class="grow m-4">
            <slot></slot>
        </main>

        <footer class="fixed bottom-0 left-0 w-full flex justify-between">
            <button
                class="text-gray-400 relative z-[99] rounded p-[3px] px-2 m-2 outline-gray-400 hover:text-gray-100 hover:bg-white hover:bg-opacity-15 transition flex gap-1 place-items-center"
                @click="changeLocale">
                <UIcon class="w-4 h-4" name="i-heroicons-language-solid" />
                <p class="text-sm">{{ locale }}</p>
            </button>

            <button
                class="text-gray-400 relative z-[99] rounded p-[3px] px-2 m-2 outline-gray-400 hover:text-gray-100 hover:bg-white hover:bg-opacity-15 transition flex gap-1 place-items-center"
                @click="isCreditOpen = true">
                <UIcon class="w-4 h-4" name="i-heroicons-information-circle" />
                <p class="text-sm">Hi</p>
            </button>
        </footer>

        <UModal v-model="isCreditOpen">
            <UCard class="relative shadow-lg overflow-hidden">
                <img src="/img/leaves.svg"
                    class="absolute top-0 left-0 object-cover scale-150 w-full h-full opacity-5 z-0" />
                <div class="relative z-10 text-xs text-center flex flex-col gap-1">
                    <p>Made with ❤ by Jo</p>
                    <i class="text-gray-400">My gratitude to <span
                            class="bg-gray-400 transition select-none hover:bg-transparent hover:opacity-20 rounded">Loxky</span>
                        for being my inspiration to build this ツ.</i>

                    <div class="mt-4 flex place-content-center gap-8">
                        <UButton variant="outline" color="gray" target="_blank" icon="i-mdi-github" label="jo0707"
                            size="2xs" to="https://github.com/jo0707" />
                        <UButton variant="outline" color="gray" target="_blank" icon="i-heroicons-window" label="Jo?"
                            size="2xs" to="https://jooo.site/" />
                    </div>
                </div>
            </UCard>
        </UModal>
    </div>
</template>

<script setup lang="ts">
const isCreditOpen = ref(false)
const { locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

function changeLocale() {
    navigateTo(locale.value == 'en' ? switchLocalePath('id') : switchLocalePath('en'))
}
</script>