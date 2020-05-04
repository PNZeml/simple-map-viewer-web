<template>
  <v-app id="signup">
    <span class="app-background"/>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary">
                <v-toolbar-title class="white--text">Sign Up</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                      v-model="name"
                      label="Name, of at least 2 characters"
                      name="tfLogin"
                      prepend-icon="person"
                      type="text"
                  />
                  <v-text-field
                      v-model="password"
                      label="Enter a password of at least 8 characters"
                      name="tfPassword"
                      prepend-icon="lock"
                      type="password"
                  />
                  <v-text-field
                      v-model="passwordConformation"
                      label="Confirm password"
                      name="tfPassword"
                      prepend-icon="lock"
                      type="password"
                  />
                  <v-text-field
                      v-model="email"
                      label="Email"
                      name="tfEmail"
                      prepend-icon="email"
                      type="email"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="primary" @click="OnSignUpClicked">Sign Up</v-btn>
                <v-btn color="secondary" to="/signin">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
    import AuthStoreModule from "@/features/auth/AuthStoreModule";
    import {Component, Vue} from "vue-property-decorator";

    @Component({name: "signup"})
    export default class SignUpView extends Vue {
        private name = "";
        private password = "";
        private passwordConformation = "";
        private email = "";

        private async OnSignUpClicked(): Promise<void> {
            await AuthStoreModule.RequestSignUp({
                name: this.name,
                password: this.password,
                email: this.email,
            });
            await this.$router.push("/signin");
        }
    }
</script>
