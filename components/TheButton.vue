<template>
    <div>
        <button
            class="flex justify-center place-content-center bg-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-100 hover:bg-opacity-20 rounded transition p-1">
            <p v-if="text">{{ text }}</p>
            <UIcon v-else-if="icon" class="w-5 h-5" :name="icon"></UIcon>
        </button>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['text', 'icon'])
</script>