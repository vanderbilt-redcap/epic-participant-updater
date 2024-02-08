<template>
    <div class="page">
        <p>This module exposes an endpoint that listens for study related data coming from Hyperspace.</p>

        <p>Whenever a patient is added to a study in Hyperspace, an XML payload is sent to an exposed URL in REDCap.</p>

        <span>The XML payload is parsed to update/create a record in REDCap using this information:</span>
        <ul>
            <li>study ID</li>
            <li>patient MRN</li>
            <li>enrollment status</li>
            <li>starting date of the study</li>
            <li>ending date of the study</li>
        </ul>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>