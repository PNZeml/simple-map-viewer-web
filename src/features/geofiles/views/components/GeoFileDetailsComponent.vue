<template>
  <v-container>
    <h3 v-if="viewModel.geoFile">File detail {{ viewModel.geoFile.id }}</h3>
    <h3 v-else>Select file to see details</h3>
    <v-tabs fixed-tabs>
      <v-tab>Properties</v-tab>
      <v-tab>History</v-tab>

      <v-tab-item>
        <v-row>
          <v-col>Size</v-col>
          <v-col>{{ viewModel.geoFile.size }}</v-col>
        </v-row>
        <!--<v-row>
          <v-col cols="4">Owner</v-col>
          <v-col cols="6">{{ viewModel.selectedGeoFile.owner.name }}</v-col>
        </v-row>-->
        <v-row>
          <v-col>Modified</v-col>
          <v-col>{{ viewModel.createdDate }}</v-col>
        </v-row>
        <v-row>
          <v-col>Created</v-col>
          <v-col>{{ viewModel.geoFile.createdDate }}</v-col>
        </v-row>
      </v-tab-item>

      <v-tab-item>
        TODO
      </v-tab-item>

    </v-tabs>
  </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import {Observer} from "mobx-vue";
    import {GeoFilesViewModel} from "@/features/geofiles/viewmodel/GeoFilesViewModel";

    @Observer
    @Component({name: "geo-file-details"})
    export default class GeoFileDetailsComponent extends Vue {
        private geoFileId: number | null = null;

        @inject("GeoFilesViewModel")
        private viewModel!: GeoFilesViewModel;
    }
</script>
