<template>
  <v-container fluid class="fill-height ma-0 pa-0">
    <v-toolbar class="elevation-1">
      <v-spacer/>
      <v-btn icon v-if="geoFileRow" v-on:click="onOpenGeoFileClicked">
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-table</v-icon>
      </v-btn>
      <v-btn
          icon
          color="inherit"
      >
        <v-icon>mdi-information</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row dense>
      <v-col
          style="padding-top: 0; padding-bottom: 0"
          sm="0"
          xs="0"
      >
        <v-data-table
            class="overflow-y-auto"
            fixed-header hide-default-footer
            item-key="id"
            :height="`calc(100vh - ${$vuetify.application.top * 2}px)`"
            :headers="headers"
            :items-per-page="1000"
            :items="viewModel.geoFiles"
            v-on:click:row="onGeoFileClicked"
        >
          <template v-slot:item.owner="{ item }">
            <span v-if="item">
              {{ customizeOwnerColumn(item.owner) }}
            </span>
          </template>
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
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Observer} from "mobx-vue";
    import {inject} from "inversify-props";
    import GeoFileSharedViewModel
        from "@/features/geofile-shared/viewmodels/GeoFileSharedViewModel";
    import DateUtils from "@/common/utils/DateUtils";
    import StringUtils from "@/common/utils/StringUtils";
    import {GeoFile} from "@/domain/models/GeoFile";
    import {Row} from "@/@types/vuetify";

    @Observer
    @Component({name: "geofile-shared"})
    export default class GeoFileSharedView extends Vue {
        @inject("GeoFileSharedViewModel")
        private viewModel!: GeoFileSharedViewModel;

        private headers = [
            {text: "Name", value: "name", align: "start", width: "60%"},
            {text: "Owner", value: "owner"},
            {text: "Last modified", value: "modified"},
            {text: "File size", value: "size"},
        ];
        private geoFileRow: Row | null = null;
        private geoFile: GeoFile | null = null;

        // lifetime methods
        async mounted() {
            await this.viewModel.loadGeoFiles();
        }

        private async onGeoFileClicked(geoFile: GeoFile, row: Row) {
            this.geoFileRow?.select(false);
            this.geoFileRow = row;
            this.geoFileRow.select(true);

            this.geoFile = geoFile;
        }

        private onOpenGeoFileClicked() {
            const geoFileId = this.geoFile?.id;
            this.$router.push(`/map/${geoFileId}`)
        }


        // table column customizations
        private customizeOwnerColumn(owner: string | null): string {
            if (owner == null) return "--";
            return owner;
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