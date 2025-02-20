<template>
    <div class="barcode" :class="{ side }">
        <div v-for="(bar, index) in barcodeData" :key="index" class="sub" :style="barStyle(bar)">
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    side: Boolean,
});

const barcodeData = [
    { width: 3, space: 5 },
    { width: 5, space: 3 },
    { width: 3, space: 2 },
    { width: 5, space: 7 },
    { width: 3, space: 5 },
    { width: 3, space: 3 },
    { width: 3, space: 2 },
    { width: 6, space: 4 },
    { width: 3, space: 4 },
    { width: 8, space: 7 },
    { width: 3, space: 2 },
    { width: 3, space: 3 },
    { width: 8, space: 2 },
    { width: 3, space: 7 },
    { width: 6, space: 4 },
    { width: 3, space: 2 },
    { width: 5 }
];

const barStyle = (bar) => ({
    width: props.side ? "100%" : `${bar.width}px`,
    height: props.side ? `${bar.width}px` : "100%",
    marginBottom: props.side ? `${bar.space || 0}px` : "0",
    marginRight: props.side ? "0" : `${bar.space || 0}px`
});
</script>

<style scoped>
.barcode {
    height: 37px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}

.barcode.side {
    width: 37px;
    height: auto;
    flex-direction: column;
}

.sub {
    background-color: #193A38;
}
</style>