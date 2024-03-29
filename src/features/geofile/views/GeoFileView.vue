<template>
  <v-container fluid class="fill-height ma-0 pa-0">
    <v-toolbar class="elevation-0">
      <geo-files-upload-dialog/>
      <v-spacer/>
      <v-btn icon v-if="geoFileRow" v-on:click="onOpenGeoFileClicked">
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-table</v-icon>
      </v-btn>
      <v-btn
          icon
          :color="isDetailsVisible ? 'primary' : 'inherit' "
          v-on:click="isDetailsVisible = !isDetailsVisible"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row dense>
      <v-col
          style="padding-top: 0; padding-bottom: 0"
          sm="0"
          xs="0"
          :lg="isDetailsVisible ? 8 : 0"
      >
        <v-data-table
            class="overflow-y-auto"
            fixed-header hide-default-footer
            item-key="id"
            :height="`calc(100vh - ${$vuetify.application.top * 2}px)`"
            :headers="headers"
            :items-per-page="1000"
            :items="viewModel.geoFiles"
            :loading="viewModel.areGeoFilesLoading"
            v-on:click:row="onGeoFileClicked"
        >
          <template v-slot:item.modified="{ item }">
            <span v-if="item">
              {{ customizeModifiedColumn(item.modified) }}
            </span>
          </template>
          <template v-slot:item.size="{ item }">
            <span v-if="item">
              {{ customizeSizeColumn(item.size) }}
            </span>
          </template>
        </v-data-table>
      </v-col>
      <v-col class="overflow-y-auto sidebar elevation-1" v-if="isDetailsVisible">
        <geo-file-details/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import GeoFileDetails from "@/features/geofile/views/components/GeoFileDetailsComponent.vue";
    import {Component, Vue} from "vue-property-decorator";
    import {Observer} from "mobx-vue";
    import {inject} from "inversify-props";
    import {Row} from "@/@types/vuetify";
    import GeoFilesUploadDialog
        from "@/features/geofile/views/components/GeoFileUploadDialogComponent.vue";
    import DateUtils from "@/common/utils/DateUtils";
    import StringUtils from "@/common/utils/StringUtils";
    import GeoFileDetailsViewModel
        from "@/features/geofile/viewmodel/geofile-details/GeoFileDetailsViewModel";
    import GeoFileViewModel from "@/features/geofile/viewmodel/geofile/GeoFileViewModel";
    import {GeoFile} from "@/domain/models/GeoFile";
    import GeoFileShareViewModel
        from "@/features/geofile/viewmodel/geofile-share/GeoFileShareViewModel";
    import {GeoFilesWebApiService} from "@/data/webapi/geofile/GeoFilesWebApiService";

    @Observer
    @Component({
        components: {
            GeoFilesUploadDialog,
            GeoFileDetails,
        }
    })
    export default class GeoFilesView extends Vue {
        @inject("GeoFileViewModel")
        private viewModel!: GeoFileViewModel;
        @inject("GeoFileDetailsViewModel")
        private geoFileDetailsViewModel!: GeoFileDetailsViewModel;
        @inject("GeoFileShareViewModel")
        private geoFileShareViewModel!: GeoFileShareViewModel;
        @inject("GeoFilesWebApiService")
        private geoFilesService!: GeoFilesWebApiService;

        private isDetailsVisible = false;
        private headers = [
            {text: "Name", value: "name", align: "start", width: "60%"},
            {text: "Last modified", value: "modified"},
            {text: "File size", value: "size"},
        ];
        private geoFileRow: Row | null = null;

        // lifetime methods
        async mounted() {
            await this.viewModel.loadGeoFiles();
        }

        // view events
        private async onGeoFileClicked(geoFile: GeoFile, row: Row) {
            this.geoFileRow?.select(false);
            this.geoFileRow = row;
            this.geoFileRow.select(true);

            const loadedGeoFile = await this.geoFilesService.getGeoFile(geoFile.id);
            this.geoFileDetailsViewModel.geoFile = loadedGeoFile;
            this.geoFileShareViewModel.geoFile = loadedGeoFile;
            this.geoFileShareViewModel.loadUsersByGeoFile();
        }

        private onOpenGeoFileClicked() {
            const geoFileId = this.geoFileDetailsViewModel.geoFile?.id;
            this.$router.push(`/map/${geoFileId}`)
        }

        // table column customizations
        private customizeModifiedColumn(modified: Date | null): string {
            if (modified == null) return "--";
            return DateUtils.toTimeFormatIfTodayOtherwiseDate(modified);
        }

        private customizeSizeColumn(size: number | null): string {
            if (size == null) return "--";
            return StringUtils.toSize(size);
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