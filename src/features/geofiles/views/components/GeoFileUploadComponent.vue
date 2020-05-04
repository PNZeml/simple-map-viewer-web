<template>
  <v-row justify="center">
    <v-dialog v-model="isShown" persistent max-width="600px">
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
                    v-model="fileToUpload"
                    @change="OnFilePicked"
                    multiple label="File input"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="isShown = false">Close</v-btn>
          <v-spacer/>
          <v-btn color="blue darken-1" text @click="OnUploadClicked">Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
    import Webapi from "@/domain/services/webapi/WebApiService";
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
        name: "file-upload-dialog"
    })
    export default class FileUploadDialog extends Vue {
        @Prop()
        public isShown = false;
        private fileToUpload: File[] = [];

        private OnFilePicked(): void {
            console.log("TODO");
        }

        private async OnUploadClicked(): Promise<void> {
            const formData = new FormData();
            formData.append('file', this.fileToUpload[0]);
            //await Webapi.Create("files", formData);
        }
    }
</script>
