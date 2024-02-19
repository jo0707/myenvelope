<template>
    <div class="text-center bg-gray-200 p-1 pb-4 overflow-visible relative">
        <div class="flex flex-col gap-2">
            <img class="max-w-4xl max-h-svh rounded-sm" :src="src" alt="text">
            <p class="text-sm text-gray-800">{{ text }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['src', 'text'])
</script>