<template>
  <v-container fluid class="pa-0 ma-0">
    <v-toolbar class="elevation-1">
      <v-spacer/>
      <v-btn
          icon
          v-if="selectedRow"
          v-on:click="OnShowGeoFileClicked"
      >
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-table</v-icon>
      </v-btn>
      <v-btn
          icon
          @click="isGeoFileDetailShown = !isGeoFileDetailShown"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-data-table
            class="overflow-y-auto fill-height"
            height="84.5vh"
            hide-default-footer
            :headers="geoFileDataTableHeaders"
            :items="geoFiles"
            :items-per-page="1000"
            @click:row="OnGeoFileClicked"
            item-key="id"
        >
          <template v-slot:item.modifiedDate="{ item }">
            <span v-if="item">{{ item.modifiedDate | moment("YYYY.MM.DD HH:mm") }}</span>
          </template>
        </v-data-table>
      </v-col>
      <v-col class="sidebar" v-if="isGeoFileDetailShown">
        <geo-file-details/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import GeoFilesStoreModule from "@/features/geofiles/GeoFilesStoreModule";
    import GeoFileDetails
        from "@/features/geofiles/views/components/GeoFileDetailsComponent.vue";
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        components: {GeoFileDetails}
    })
    export default class GeoFilesView extends Vue {
        // Layout fields
        private isGeoFileDetailShown = false;
        private geoFileDataTableHeaders = [
            {text: "Name", value: "name", align: "start", width: "70%"},
            {text: "Owner"},
            {text: "Last modified", value: "modifiedDate"},
            {text: "File size", value: "size"},
        ];

        private geoFiles: Array<GeoFile> = [];
        private selectedRow: Row | null = null;

        // Lifecycle methods
        async mounted() {
            await GeoFilesStoreModule.RetrieveGeoFiles();
            this.geoFiles = GeoFilesStoreModule.geoFiles;
        }

        // Component event handlers
        private OnGeoFileClicked(geoFile: GeoFile, selectedRow: Row) {
            this.selectedRow?.select(false);
            this.selectedRow = selectedRow;
            this.selectedRow.select(true);

            GeoFilesStoreModule.setSelectedGeoFile(geoFile);
        }

        private OnShowGeoFileClicked() {
            this.$router.push(`/map/${GeoFilesStoreModule.selectedGeoFile?.id!}`)
        }
    }
</script>


<style lang="scss">
  .sidebar {
    -ms-flex: 0 0 300px;
    flex: 0 0 300px;
  }

  @media (max-width: 690px) {
    .sidebar {
      display: none;
    }
  }
</style>