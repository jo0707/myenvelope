<template>
    <div class="text-center">
        <div class="flex flex-col gap-2">
            <img class="max-w-4xl max-h-svh rounded" :src="src" alt="text">
            <p class="text-sm text-gray-400">{{ text }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(['src', 'text'])
</script>