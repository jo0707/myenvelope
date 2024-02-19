<template>
    <div class="relative min-w-10 rounded overflow-clip border-2 border-gray-400/70 shadow">
        <div ref="colorPreview"
            class="absolute top-0 left-0 w-full h-full bg-gray-900 cursor-pointer grid place-items-center">
            <UIcon ref="iconPreview" name="i-heroicons-swatch-solid" class="color-gray-400" />
        </div>
        <input class="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" type="color" v-model="model" />
    </div>
</template>

<script setup lang="ts">
const model = defineModel<string>()
const colorPreview = ref<HTMLDivElement | null>(null)

watchEffect(() => {
    if (colorPreview.value) colorPreview.value.style.backgroundColor = model.value ?? "#FFFFFF"
})
</script>