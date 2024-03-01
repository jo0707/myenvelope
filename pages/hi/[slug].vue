<template>
    <div class="h-full w-full">
        <Transition name="fade">
            <ErrorScreen class="h-full w-full fixed top-0 left-0" v-if="dataStore.error" />
            <LoadingScreen class="h-full w-full fixed top-0 left-0" v-else-if="!dataStore.data" />
            <UContainer v-else class="w-full h-full">
                <TheDisplay class="h-full w-full relative z-50" />
            </UContainer>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
const slug = useRoute().params.slug as string

dataStore.fetchDataFromServer(slug)
</script>