<template>
  <v-container>
    <span v-if="selectedGeoFile">File detail {{ selectedGeoFile.id }}</span>
    <span v-else>Select file to see details</span>
    <v-tabs centered>
      <v-tab>
        Details
      </v-tab>
      <v-tab>
        History
      </v-tab>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
    import GeoFilesStoreModule from "@/features/geofiles/GeoFilesStoreModule";
    import {Component, Vue} from "vue-property-decorator";

    @Component({name: "geo-file-details"})
    export default class GeoFileDetailsComponent extends Vue {
        private geoFileId: number | null = null;

        // Computed props
        private get selectedGeoFile(): GeoFile | null {
            // TODO: get file details from server
            return GeoFilesStoreModule.selectedGeoFile;
        }
    }
</script>
