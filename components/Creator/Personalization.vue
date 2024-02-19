<template>
    <div>
        <div>
            <UFormGroup label="Nama Sapaan">
                <UInput icon="i-heroicons-user-circle-solid" v-model="dataStore.data.name" maxlength="64" />
            </UFormGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDataStore } from '~/store/dataStore';

const dataStore = useDataStore()
</script>