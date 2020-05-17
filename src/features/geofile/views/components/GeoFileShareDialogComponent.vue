<template>
  <v-dialog v-model="viewModel.isDialogShown" max-width="600">
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>mdi-share</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline">
        Share file with other users
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-autocomplete
                v-model="selectedUsers"
                :items="viewModel.users"
                :search-input.sync="searchQuery"
                :loading="viewModel.areUsersLoading"
                chips
                return-object
                multiple
                item-text="name"
                item-value="id"
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
          <v-col>
            <v-select
                v-model="selectedAccessType"
                :items="accessTypes"

                item-text="Text"
                item-value="Value"
                persistent-hint
                return-object
                single-line
                chips
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text>Close</v-btn>
        <v-spacer/>
        <v-btn color="blue darken-1" text v-on:click="onShareClicked">Upload</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import GeoFileShareDialogViewModel
        from "@/features/geofile/viewmodel/geofile-share/GeoFileShareDialogViewModel";
    import UserDto from "@/domain/dtos/user/UserDto";
    import lodash from "lodash";
    import {Observer} from "mobx-vue";

    @Observer
    @Component({name: "geo-file-share-dialog"})
    export default class GeoFileShareDialogComponent extends Vue {
        @inject("GeoFileShareDialogViewModel")
        private viewModel!: GeoFileShareDialogViewModel;

        private searchQuery: string | null = null;
        private selectedUsers: Array<UserDto> = [];
        private selectedAccessType: any;
        private accessTypes = [
            { Text: "Watch", Value: 1 },
            { Text: "Comment", Value: 2 },
            { Text: "Edit", Value: 3 }
        ]

        mounted(): void {
            this.selectedAccessType = this.accessTypes[0];
        }

        beforeDestroy(): void {
            // workaround, prevent second dialog showing when
            // previously close it with click outside
            this.viewModel.isDialogShown = false;
        }

        @Watch("searchQuery")
        private onSearchQueryChanged(searchQuery: any): void {
            this.viewModel.loadUsersBySearchQuery(searchQuery);
        }

        private onRemoveSelectedUserClick(user: UserDto): void {
            lodash.remove(this.selectedUsers, x => {
                return x.id == user.id;
            });
        }

        private onShareClicked(): void {
            console.log("TODO")
        }
    }
</script>
