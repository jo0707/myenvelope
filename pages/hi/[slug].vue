<template>
    <div class="h-full flex gap-2">
        <MainDisplay />
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
const slug = useRoute().params.slug as string

dataStore.fetchDataFromServer(slug)
</script>