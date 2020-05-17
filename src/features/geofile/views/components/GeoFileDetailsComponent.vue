<template>
  <v-container>
    <v-row>
      <v-col v-if="viewModel.geoFile">{{ viewModel.name }} FILE DETAILS</v-col>
      <v-col v-else>Select a file to see its details</v-col>
    </v-row>
    <v-tabs v-if="viewModel.geoFile" fixed-tabs>
      <v-tab>Properties</v-tab>
      <v-tab-item>
        <v-row>
          <geo-file-share-dialog/>
        </v-row>
        <v-row>
          <v-col>Size</v-col>
          <v-col>{{ viewModel.size }}</v-col>
        </v-row>
        <v-row>
          <v-col>Owner</v-col>
          <v-col>TODO</v-col>
        </v-row>
        <v-row>
          <v-col>Created</v-col>
          <v-col>{{ viewModel.created }}</v-col>
        </v-row>
        <v-row v-if="viewModel.modified">
          <v-col>Modified</v-col>
          <v-col>{{ viewModel.modified }}</v-col>
        </v-row>
        <v-row v-if="viewModel.opened">
          <v-col>Opened</v-col>
          <v-col>{{viewModel.opened}}</v-col>
        </v-row>
      </v-tab-item>

      <v-tab>Activity</v-tab>
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
    import GeoFileDetailsViewModel from "@/features/geofile/viewmodel/geofile-details/GeoFileDetailsViewModel";
    import GeoFileShareDialogComponent
        from "@/features/geofile/views/components/GeoFileShareDialogComponent.vue";
    import GeoFileShareDialog
        from "@/features/geofile/views/components/GeoFileShareDialogComponent.vue";

    @Observer
    @Component({
        name: "geo-file-details",
        components: {GeoFileShareDialog, GeoFileShareDialogComponent}
    })
    export default class GeoFileDetailsComponent extends Vue {
        @inject("GeoFileDetailsViewModel")
        private viewModel!: GeoFileDetailsViewModel;
    }
</script>

<style lang="scss">
</style>
