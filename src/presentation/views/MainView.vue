<template>
  <v-app>
    <!-- Navigation Menu -->
    <v-navigation-drawer v-model="isMenuToggled" app clipped>
      <v-list-item v-if="viewModel.token">
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ viewModel.user.name }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>

      <v-list
          dense nav
          v-model="navItems"
          v-for="(navItem, i) in navItems"
          :key="i"
      >
        <v-list-item
            v-if="navItem.isShown"
            link :to="navItem.route"
        >
          <v-list-item-action>
            <v-icon v-html="navItem.icon"/>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-html="navItem.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block v-if="viewModel.token" v-on:click="onSignOutClicked">Sign Out</v-btn>
          <v-btn block v-else to="/signin">Sign In</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar app clipped-left class="white--text" color="primary">
      <v-app-bar-nav-icon v-on:click="isMenuToggled = !isMenuToggled"/>
      <v-toolbar-title>Simple map viewer</v-toolbar-title>
    </v-app-bar>

    <!-- Page Content -->
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>


<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import {AuthViewModel} from "@/features/auth/viewmodel/AuthViewModel";

    @Component
    export default class MainView extends Vue {
        @inject("AuthViewModel")
        private viewModel!: AuthViewModel;

        // Layout fields
        private isMenuToggled = false;
        private navItems = [
            {
                route: "/map",
                icon: "mdi-map",
                title: "Map",
                isShown: true
            },
            {
                route: "/geofiles",
                icon: "mdi-folder",
                title: "My GeoFiles",
                isShown: this.viewModel.token
            },
            {
                route: "/shared-with-me",
                icon: "mdi-folder-account",
                title: "Shared With Me",
                isShown: this.viewModel.token
            },
            {
                route: "/bin",
                icon: "mdi-delete",
                title: "Bin",
                isShown: this.viewModel.token
            },
            {
                route: "/settings",
                icon: "mdi-settings",
                title: "Settings",
                isShown: this.viewModel.token
            },
        ];

        private onSignOutClicked(): void {
            this.viewModel.signOut();
            this.$router.go(0);
        }
    }
</script>
