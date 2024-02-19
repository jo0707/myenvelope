<template>
    <div class="h-screen w-screen flex max-md:flex-col p-4">
        <div class="grow w-full h-full flex flex-col">
            <header></header>
            <main class="grow">
                <slot></slot>
            </main>
            <UDivider />
            <footer class="py-4 ">
                <AudioPlayer />
            </footer>
        </div>
        <UDivider class="w-min px-2" orientation="vertical" />
        <CreatorForm class="max-md:h-[75vh] md:w-[26rem] overflow-y-auto" />
    </div>
</template>

<script setup lang="ts">

</script>