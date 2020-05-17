<template>
  <v-app id="signin">
    <span class="app-background"/>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <!-- Toolbar -->
              <v-toolbar color="primary">
                <v-toolbar-title class="white--text">Sign In</v-toolbar-title>
              </v-toolbar>
              <!-- Content -->
              <v-card-text>
                <v-form ref="SignInForm">
                  <!-- Login -->
                  <v-text-field
                      v-model="login"
                      :rules="[rules.required]"
                      label="Username or email"
                      name="tfLogin"
                      prepend-icon="person"
                      type="text"
                  />

                  <!-- Password -->
                  <v-text-field
                      v-model="password"
                      :append-icon="isPasswordShown ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="isPasswordShown ? 'text' : 'password'"
                      :rules="[rules.required]"
                      @click:append="isPasswordShown = !isPasswordShown"
                      label="Password"
                      name="tfPassword"
                      prepend-icon="lock"
                  />
                </v-form>
              </v-card-text>
              <!-- TODO: Add restore password, add auth via google? -->
              <!-- Buttons -->
              <v-card-actions>
                <v-spacer/>
                <v-btn @click="OnSignInClicked" color="primary">Sign In</v-btn>
                <v-btn color="secondary" to="/signup">Sign Up</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {inject} from "inversify-props";
    import {AuthViewModel} from "@/features/auth/viewmodel/auth/AuthViewModel";

    export type VForm = Vue & { validate: () => boolean }

    @Component({name: "signin"})
    export default class SignInView extends Vue {
        @inject("AuthViewModel")
        private viewModel!: AuthViewModel;

        // Component behaviour fields
        private isPasswordShown = false;
        private rules = {
            required: (x: string) => !!x || "Required",
        };

        // Form fields
        private login = "";
        private password = "";

        // Events handlers
        private async OnSignInClicked() {
            if (!this.IsFromValid()) return;

            try {
                await this.viewModel.requestSignIn({
                    login: this.login,
                    password: this.password
                });
                await this.$router.push("/map");
            } catch (error) {
                // TODO: Proper logging
                // TODO: Show an error if occurred
                console.log(`An error occurred while login: ${error}`)
            }
        }

        // Internal methods
        private IsFromValid(): boolean {
            const form = this.$refs.SignInForm as VForm;
            return form.validate();
        }
    }
</script>
