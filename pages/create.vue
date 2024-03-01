<template>
    <div class="h-full w-full">
        <Transition name="fade">
            <ErrorScreen class="h-full w-full fixed top-0 left-0" v-if="dataStore.error" />
            <LoadingScreen class="h-full w-full fixed top-0 left-0" v-else-if="!dataStore.data" />
            <div v-else class="h-full w-full relative z-50 flex gap-2">
                <UContainer class="w-full h-full">
                    <TheDisplay class="h-full w-full relative z-50" />
                </UContainer>
                <UDivider class="w-min px-2" orientation="vertical" />
                <CreatorForm
                    class="max-md:h-[75vh] md:w-[26rem] border-2 border-primary-400/80 shadow-primary-400/50 shadow max-h-[96vh] overflow-y-auto" />
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
dataStore.fetchDataFromLocal()
</script>