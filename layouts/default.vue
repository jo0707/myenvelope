<template>
    <div>
        <UContainer class="h-screen flex flex-col ">
            <header></header>

            <main class="grow">
                <slot></slot>
            </main>


            <UDivider />
            <footer class="py-4 ">
                <AudioPlayer />
            </footer>
        </UContainer>
    </div>
</template>

<script setup lang="ts">

</script>