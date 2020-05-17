<template>
  <v-container fluid class="fill-height ma-0 pa-0">
    <v-toolbar class="elevation-0">
      <geo-files-upload-dialog/>
      <v-spacer/>
      <v-btn icon v-if="geoFileRow" v-on:click="onShowGeoFileClicked">
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-table</v-icon>
      </v-btn>
      <v-btn
          icon
          :color="isDetailsVisible ? 'blue' : 'inherit' "
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
      <v-col class="overflow-y-auto sidebar" v-if="isDetailsVisible">
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
    import GeoFileDetailsViewModel from "@/features/geofile/viewmodel/geofile-details/GeoFileDetailsViewModel";
    import GeoFileViewModel from "@/features/geofile/viewmodel/geofile/GeoFileViewModel";

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

        private isDetailsVisible = false;
        private headers = [
            {text: "Name", value: "name", align: "start", width: "60%"},
            {text: "Owner"},
            {text: "Last modified", value: "modified"},
            {text: "File size", value: "size"},
        ];
        private geoFileRow: Row | null = null;

        async mounted() {
            await this.viewModel.loadGeoFiles();
        }

        private onGeoFileClicked(geoFile: GeoFile, row: Row) {
            this.geoFileRow?.select(false);
            this.geoFileRow = row;
            this.geoFileRow.select(true);

            this.geoFileDetailsViewModel.getGeoFileById(geoFile.id);
        }

        private onShowGeoFileClicked() {
            const geoFileId = this.geoFileDetailsViewModel.geoFile?.id;
            this.$router.push(`/map/${geoFileId}`)
        }

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