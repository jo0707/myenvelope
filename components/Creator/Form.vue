<template>
    <div class="bg-gray-900/80 backdrop-blur-sm shadow rounded-lg flex flex-col gap-2 p-2 md:p-4">
        <h1>{{ $t('createYours') }}</h1>

        <UAccordion :items="items" variant="soft" size="xs">
            <template #personalization>
                <CreatorPersonalization />
            </template>

            <template #background>
                <CreatorBackground />
            </template>

            <template #music>
                <CreatorMusic />
            </template>

            <template #typing>
                <CreatorTyping />
            </template>

            <template #messages>
                <CreatorMessages />
            </template>
        </UAccordion>
        <UDivider />
        <CreatorSubmit />
    </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const items = [{
    label: t('personalization'),
    slot: "personalization",
    icon: 'i-heroicons-user-circle-solid',
    defaultOpen: true,
}, {
    label: t('background'),
    slot: "background",
    icon: 'i-heroicons-photo-solid',
}, {
    label: t('music'),
    slot: "music",
    icon: 'i-heroicons-musical-note-solid',
}, {
    label: t('writingStyle'),
    slot: "typing",
    icon: 'i-heroicons-pencil-square-solid',
}, {
    label: t('message'),
    slot: "messages",
    icon: 'i-heroicons-envelope-solid',
},]
</script>