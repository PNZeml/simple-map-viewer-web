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
          @click="isDetailShown = !isDetailShown"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row>
      <v-col
          :lg="isDetailShown ? 8 : 0"
          sm="0"
          xs="0"
      >
        <v-data-table
            class="overflow-y-auto fill-height"
            height="84.5vh"
            hide-default-footer
            :headers="geoFileDataTableHeaders"
            :items="viewModel.geoFiles"
            :items-per-page="1000"
            @click:row="OnGeoFileClicked"
            item-key="id"
        >
          <template v-slot:item.modifiedDate="{ item }">
            <span v-if="item">
              {{ item.modifiedDate | moment("YYYY.MM.DD HH:mm") }}
            </span>
          </template>
        </v-data-table>
      </v-col>
      <v-col
          class="sidebar"
          v-if="isDetailShown"
      >
        <geo-file-details/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import GeoFileDetails from "@/features/geofiles/views/components/GeoFileDetailsComponent.vue";
    import {Component, Vue} from "vue-property-decorator";
    import {Observer} from "mobx-vue";
    import {inject} from "inversify-props";
    import {GeoFilesViewModel} from "@/features/geofiles/viewmodel/GeoFilesViewModel";
    import {Row} from "@/@types/vuetify";

    @Observer
    @Component({
        components: {GeoFileDetails}
    })
    export default class GeoFilesView extends Vue {
        @inject("GeoFilesViewModel")
        private viewModel!: GeoFilesViewModel;

        // Layout fields
        private isDetailShown = false;
        private geoFileDataTableHeaders = [
            {text: "Name", value: "name", align: "start", width: "70%"},
            {text: "Owner"},
            {text: "Last modified", value: "modifiedDate"},
            {text: "File size", value: "size"},
        ];
        private selectedRow: Row | null = null;

        // Lifecycle methods
        async mounted() {
            await this.viewModel.fetchGeoFiles();
        }

        // Component event handlers
        private OnGeoFileClicked(geoFile: GeoFile, selectedRow: Row) {
            this.selectedRow?.select(false);
            this.selectedRow = selectedRow;
            this.selectedRow.select(true);

            this.viewModel.selectGeoFile(geoFile);
        }

        private OnShowGeoFileClicked() {
            this.$router.push(`/map/${this.viewModel.geoFile?.id!}`)
        }
    }
</script>


<style lang="scss">
  @media (max-width: 1000px) {
    .sidebar {
      display: none;
    }
  }
</style>