<template>
  <v-dialog v-model="viewModel.isDialogShown" max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-file</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="headline">File uploading</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-card color="#385F73" dark>
                <v-card-title primary-title class="justify-center">
                  <div>Drop file to upload here</div>
                </v-card-title>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-file-input
                  v-model="geoFiles"
                  @change="onGeoFilePicked"
                  multiple label="File input"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text v-on:click="onCloseClicked">Close</v-btn>
        <v-spacer/>
        <v-btn color="blue darken-1" text v-on:click="onUploadClicked">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import {Observer} from "mobx-vue";
    import GeoFilesUploadDialogViewModel
        from "@/features/geofile/viewmodel/geofile-upload/GeoFilesUploadDialogViewModel";

    @Observer
    @Component({name: "geo-files-upload-dialog"})
    export default class GeoFilesUploadDialogComponent extends Vue {
        @inject("GeoFilesUploadDialogViewModel")
        private viewModel!: GeoFilesUploadDialogViewModel;

        private geoFiles: File[] = [];

        private onGeoFilePicked(): void {
            console.log("TODO");
        }

        private onCloseClicked(): void {
            this.viewModel.isDialogShown = false;
        }

        private async onUploadClicked(): Promise<void> {
            const formData = new FormData();
            formData.append("file", this.geoFiles[0]);
            //await Webapi.Create("files", formData);
        }
    }
</script>
