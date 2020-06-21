<template>
  <v-container>
    <v-row style="text-align: center;">
      <v-col v-if="viewModel.geoFile">{{ viewModel.name }} FILE DETAILS</v-col>
      <v-col v-else>Select a file to see its details</v-col>
    </v-row>
    <v-tabs v-if="viewModel.geoFile" fixed-tabs>
      <v-tab>Properties</v-tab>
      <v-tab-item>
        <v-row>
          <v-col>Size</v-col>
          <v-col>{{ viewModel.size }}</v-col>
        </v-row>
        <v-row>
          <v-col>Owner</v-col>
          <v-col>{{ viewModel.owner }}</v-col>
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
        <v-row>
          <v-col>
            <geo-file-share-dialog/>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn style="margin-left: 6pt" depressed block color="red">Delete</v-btn>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab>Activity</v-tab>
      <v-tab-item>

        <v-list two-line v-if="this.viewModel.geoFileActivityRecords.length > 0">
          <template v-for="item in this.viewModel.geoFileActivityRecords">
            <v-list-item :key="item.occurred">
              <v-list-item-avatar>
                <v-img :src="`data:image/jpeg;base64,${item.avatar}`"/>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ item.userName }}</v-list-item-title>
                <v-list-item-subtitle class="text--primary">
                  {{ formatActivityType(item.activityType) }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text>
                  {{ formatOccurredDate(item.occurred) }}
                </v-list-item-action-text>
              </v-list-item-action>

            </v-list-item>
          </template>
        </v-list>
        <v-row v-else>
          <v-col>No activity records on this file</v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import {Observer} from "mobx-vue";
    import GeoFileDetailsViewModel
        from "@/features/geofile/viewmodel/geofile-details/GeoFileDetailsViewModel";
    import GeoFileShareDialogComponent
        from "@/features/geofile/views/components/GeoFileShareDialogComponent.vue";
    import GeoFileShareDialog
        from "@/features/geofile/views/components/GeoFileShareDialogComponent.vue";
    import DateUtils from "@/common/utils/DateUtils";
    import {ActivityType} from "@/domain/enums/ActivityType";

    @Observer
    @Component({
        name: "geo-file-details",
        components: {GeoFileShareDialog, GeoFileShareDialogComponent}
    })
    export default class GeoFileDetailsComponent extends Vue {
        @inject("GeoFileDetailsViewModel")
        private viewModel!: GeoFileDetailsViewModel;

        private formatOccurredDate = (occurredDate: Date): string =>
            DateUtils.toTimeFormatIfTodayOtherwiseDate(occurredDate);

        private formatActivityType(activityType: ActivityType): string {
            switch (activityType) {
                case ActivityType.Created:
                    return `Upload ${this.viewModel.geoFile?.name}`;
                case ActivityType.Shared:
                    return "Shared with other users";
                case ActivityType.Commented:
                    return "Added comment on the map";
                case ActivityType.Edited:
                    return "";
            }
            return "";
        }
    }
</script>

<style lang="scss">
</style>
