<template>
  <div>
    
    <b-card title="Epic Participant Updater" tag="article" class="mb-2">
      <b-card-text>
        <p>This module exposes an endpoint that listens for study related data coming from Hyperspace.
        <p>Whenever a patient is added to a study in Hyperspace, an XML payload is sent to an exposed URL in REDCap.</p>
        <p>The XML payload is parsed to update/create a record in REDCap using this information:
          <ul>
            <li>study ID</li>
            <li>patient MRN</li>
            <li>enrollment status</li>
            <li>starting date of the study</li>
            <li>ending date of the study</li>
          </ul>
        </p>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>



export default {

}
</script>

<style>

</style>