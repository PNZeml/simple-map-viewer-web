<template>
  <v-dialog v-model="viewModel.isDialogShown" max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn class="ma-2" v-on="on" depressed block color="primary">Share</v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        Share file with other users
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="8">
            <v-autocomplete
                v-model="viewModel.selectedUsers"
                :items="viewModel.users"
                :search-input.sync="searchQuery"
                :loading="viewModel.areUsersLoading"
                item-text="name"
                item-value="id"
                return-object
                multiple
                filled
                chips
            >
              <!-- Selection -->
              <template v-slot:selection="{ item }">
                <v-chip
                    v-bind="item.attrs"
                    close
                    @click:close="onRemoveSelectedUserClick(item)"
                >
                  <v-avatar left>
                    <v-img :src="`data:image/jpeg;base64,${item.avatar}`"></v-img>
                  </v-avatar>
                  {{ item.name }}
                </v-chip>
              </template>
              <!-- Item -->
              <template v-slot:item="{ item }">
                <template>
                  <v-list-item-avatar>
                    <img :src="`data:image/jpeg;base64,${item.avatar}`">
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-html="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-html="item.email"></v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-select
                v-model="viewModel.selectedAccessType"
                :items="viewModel.accessTypes"
                item-text="text"
                item-value="value"
                return-object
                single-line
                filled
                chips
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-list>
              <v-list-item-group color="primary">
                <v-list-item v-for="(item, i) in viewModel.userAccessTypes" :key="i">
                  <v-list-item-avatar>
                    <v-img :src="`data:image/jpeg;base64,${item.avatar}`"/>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.name"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
                  </v-list-item-content>
                  <v-list-item-action>
                    <span v-text="customizeAccessType(item.accessType)"/>
                  </v-list-item-action>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text v-on:click="onCloseClicked">Close</v-btn>
        <v-spacer/>
        <v-btn color="blue darken-1" text v-on:click="onShareClicked">Share</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import GeoFileShareViewModel
        from "@/features/geofile/viewmodel/geofile-share/GeoFileShareViewModel";
    import UserDto from "@/domain/dtos/user/UserDto";
    import lodash from "lodash";
    import {Observer} from "mobx-vue";
    import {toReadable} from "@/domain/enums/AccessType";

    @Observer
    @Component({name: "geo-file-share-dialog"})
    export default class GeoFileShareDialogComponent extends Vue {
        @inject("GeoFileShareViewModel")
        private viewModel!: GeoFileShareViewModel;

        private searchQuery: string | null = null;

        beforeDestroy(): void {
            // workaround, prevent second dialog showing when
            // previously close it with click outside
            this.viewModel.isDialogShown = false;
        }

        @Watch("searchQuery")
        private onSearchQueryChanged(): void {
            this.viewModel.loadUsersBySearchQuery(this.searchQuery!);
        }

        private onRemoveSelectedUserClick(user: UserDto): void {
            lodash.remove(this.viewModel.selectedUsers, x => x.id == user.id);
        }

        private onCloseClicked(): void {
            this.viewModel.isDialogShown = false;
        }

        private async onShareClicked(): Promise<void> {
            await this.viewModel.share()
            await this.viewModel.loadUsersByGeoFile()
            this.viewModel.selectedUsers = [];
        }

        private customizeAccessType(accessType: number): string {
            return toReadable(accessType);
        }
    }
</script>
