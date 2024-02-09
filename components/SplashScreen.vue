<template>
    <div class="w-full h-full backdrop-blur flex flex-col justify-center place-items-center gap-1">
        <h2 class="text-2xl font-bold">Hi, {{ dataStore.data.name }}!</h2>
        <p class="text-sm text-gray-400 mt-2 max-md:hidden">You can use the left and right keyboard arrows to navigate through the
            messages...</p>
        <p class="text-sm text-gray-400">a song will be played after this</p>

        <p class="text-sm text-gray-400 mt-8">Just click anywhere to continue :&rpar;</p>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
</script>