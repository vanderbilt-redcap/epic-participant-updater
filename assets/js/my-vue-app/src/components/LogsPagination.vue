<template>
    <nav aria-label="Log pages">
        <ul class="pagination pagination-sm mb-0">
            <li class="page-item" :class="{ disabled: isFirstPage }">
                <button type="button" class="page-link" :disabled="isFirstPage" @click="goToFirst">
                    {{ firstText }}
                </button>
            </li>
            <li class="page-item" :class="{ disabled: isFirstPage }">
                <button type="button" class="page-link" :disabled="isFirstPage" @click="goToPrevious">
                    {{ previousText }}
                </button>
            </li>
            <template v-for="(pageNumber, index) in pages" :key="`${pageNumber}-${index}`">
                <li v-if="shouldShowEllipsis(index)" class="page-item disabled">
                    <button type="button" class="page-link" disabled>{{ ellipsisText }}</button>
                </li>
                <li v-else class="page-item" :class="{ active: pageNumber === currentPage }">
                    <button type="button" class="page-link" @click="goToPage(pageNumber)">
                        {{ pageNumber }}
                    </button>
                </li>
            </template>
            <li class="page-item" :class="{ disabled: isLastPage }">
                <button type="button" class="page-link" :disabled="isLastPage" @click="goToNext">
                    {{ nextText }}
                </button>
            </li>
            <li class="page-item" :class="{ disabled: isLastPage }">
                <button type="button" class="page-link" :disabled="isLastPage" @click="goToLast">
                    {{ lastText }}
                </button>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: { type: Number, default: 1 },
    perPage: { type: Number, default: 25 },
    totalItems: { type: Number, default: 0 },
    maxVisibleButtons: { type: Number, default: 5 },
    firstText: { type: String, default: '<<' },
    previousText: { type: String, default: '<' },
    nextText: { type: String, default: '>' },
    lastText: { type: String, default: '>>' },
    ellipsisText: { type: String, default: '...' },
})

const emit = defineEmits(['update:modelValue'])

const normalizePage = (pageNumber) => {
    const parsedPage = parseInt(pageNumber, 10)
    if (Number.isNaN(parsedPage) || parsedPage < 1) return 1
    if (parsedPage > totalPages.value) return totalPages.value
    return parsedPage
}

const currentPage = computed(() => normalizePage(props.modelValue))
const totalPages = computed(() => {
    const parsedTotal = parseInt(props.totalItems, 10)
    const parsedPerPage = parseInt(props.perPage, 10)
    const total = Number.isNaN(parsedTotal) || parsedTotal < 0 ? 0 : parsedTotal
    const perPage = Number.isNaN(parsedPerPage) || parsedPerPage < 1 ? 25 : parsedPerPage
    return Math.max(1, Math.ceil(total / perPage))
})
const isFirstPage = computed(() => currentPage.value <= 1)
const isLastPage = computed(() => currentPage.value >= totalPages.value)

const pages = computed(() => {
    const buttonCount = Math.min(props.maxVisibleButtons, totalPages.value)
    const delta = Math.floor(buttonCount / 2)
    let start = currentPage.value - delta

    if (currentPage.value <= delta) start = 1
    if (currentPage.value >= totalPages.value - delta) start = totalPages.value - buttonCount + 1
    if (start < 1) start = 1

    return Array.from({ length: buttonCount }, (_, index) => start + index)
})

function shouldShowEllipsis(index) {
    const lastIndex = pages.value.length - 1
    if (pages.value.length < props.maxVisibleButtons) return false
    if (index === 0 && pages.value[index] > 1) return true
    if (index === lastIndex && pages.value[index] < totalPages.value) return true
    return false
}

function goToPage(pageNumber) {
    emit('update:modelValue', normalizePage(pageNumber))
}

function goToFirst() {
    goToPage(1)
}

function goToPrevious() {
    goToPage(currentPage.value - 1)
}

function goToNext() {
    goToPage(currentPage.value + 1)
}

function goToLast() {
    goToPage(totalPages.value)
}
</script>

<style scoped>
.page-link {
    min-width: 2.25rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
}
</style>
