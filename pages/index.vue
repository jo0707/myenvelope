<template>
    <div class="h-full w-full">
        <Transition name="fade">
            <ErrorScreen class="h-full w-full fixed top-0 left-0" v-if="dataStore.error" />
            <LoadingScreen class="h-full w-full fixed top-0 left-0" v-else-if="!dataStore.data" />
            <UContainer v-else class="w-full h-full flex flex-col place-items-center gap-2">
                <TheDisplay class="h-full w-full relative z-50" />
                <UButton variant="outline" color="gray" icon="i-heroicons-plus-circle-solid" label="Create" to="/create"
                    size="xs" />
            </UContainer>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
dataStore.fetchDataFromServer()

watchEffect(() => {
    console.log(dataStore.data)
})
</script>