<template>
  <v-container
      fluid
      class="pa-0 ma-0 fill-height"
      ref="mapContainer"
      v-if="isGeoFileVisible"
  >
    <v-dialog
        v-model="isAddCommentDialogShown"
        width="500"
    >
      <v-card>
        <v-toolbar color="primary">
          <v-toolbar-title class="white--text">Add comment</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="addCommentForm">
            <v-textarea
                clearable
                auto-grow
                v-model="comment"
                name="tfLogin"
                prepend-inner-icon="mdi-comment"
                type="text"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="onCreateCommentClicked">Add</v-btn>
          <v-spacer/>
          <v-btn color="secondary" @click="onResetCommentClicked">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        color="success"
        v-model="isCommentShown"
        :timeout="100000000">
      {{ commentText }}
    </v-snackbar>
    <v-toolbar class="elevation-1">
      <v-btn
          icon
          :color="isOnAddCommentClicked ? 'primary' : 'inherit' "
          @click="isOnAddCommentClicked = !isOnAddCommentClicked"
      >
        <v-icon>mdi-message-plus</v-icon>
      </v-btn>
      <v-btn icon color="inherit">
        <v-icon>mdi-message-minus</v-icon>
      </v-btn>
      <v-spacer/>
      <v-btn icon v-on:click="onResetViewportClicked">
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
      <v-btn
          icon
          :color="isDetailsVisible ? 'primary' : 'inherit' "
          @click="isDetailsVisible = !isDetailsVisible"
      >
        <v-icon>mdi-account-group</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row dense>
      <v-col
          style="padding-top: 0; padding-bottom: 0"
          sm="0"
          xs="0"
          :lg="isDetailsVisible ? 8 : 0"
      >
        <canvas id="mapCanvas"/>
      </v-col>
      <v-col class="sidebar" v-if="isDetailsVisible">

        <v-list shaped two-line>
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in viewModel.users" :key="i">

              <v-list-item-avatar>
                <v-img :src="`data:image/jpeg;base64,${item.avatar}`"/>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn icon>
                  <v-icon>mdi-crosshairs-gps</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-eye</v-icon>
                </v-btn>
              </v-list-item-action>

            </v-list-item>
          </v-list-item-group>
        </v-list>

      </v-col>
    </v-row>
  </v-container>
  <v-container
      fluid
      class="pa-0 ma-0 fill-height"
      v-else
  >
    <v-row
        align="center"
        justify="center"
    >
      <v-col cols="12" md="4" v-if="!viewModel.token">
        <v-card>
          <v-card-text>
            <p class="display-1 text--primary text-md-center">
              Welcome to SimpleMapView App!
            </p>
          </v-card-text>
          <v-container>
            <p>
              You're not currently loggined. You can use you're account data to sign in or create a
              new profile with sign up button.
            </p>
            <v-row align="center" justify="center">
              <v-col cols="3">
                <v-btn block color="primary">Sign in</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn block color="secondary">Sign Up</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" v-else>
        <v-card>
          <v-card-text>
            <p class="display-1 text--primary text-md-center">
              GeoFile is not picked!
            </p>
          </v-card-text>
          <v-container>
            <p>
              You're need to pick one of geofiles from your list in order to work with map.
            </p>
            <v-row align="center" justify="center">
              <v-col cols="3">
                <v-btn block color="primary">Go to geofiles</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
    import {ProjectionString} from "@/common/utils/ProjectionUtils";
    import {FeatureCollection, Position} from "geojson";
    import {Viewport} from "pixi-viewport";
    import * as PIXI from "pixi.js";
    import proj4 from "proj4";
    import {Component, Vue} from "vue-property-decorator";
    import {Observer} from "mobx-vue";
    import {inject} from "inversify-props";
    import MapViewModel from "@/features/map/viewmodel/MapViewModel";
    import signalRService from "@/data/signalr/SignalRService";
    import UserDto from "@/domain/dtos/user/UserDto";
    import CommentDto from "@/domain/dtos/message/CommentDto";
    import Application = PIXI.Application;
    import Graphics = PIXI.Graphics;
    import {async} from "rxjs/internal/scheduler/async";

    @Observer
    @Component({name: "map"})
    export default class MapView extends Vue {
        private application?: Application;
        private viewport?: Viewport;
        private geoFileGraphics?: PIXI.Graphics;

        @inject("MapViewModel")
        private viewModel!: MapViewModel;

        private isGeoFileVisible = false;
        private isDetailsVisible = false;
        private isOnAddCommentClicked = false;
        private isAddCommentDialogShown = false;
        private isCommentShown = false;

        private viewportX = 0;
        private viewportY = 0;

        private comment = "";
        private commentX = 0;
        private commentY = 0;

        private commentText = "";

        // lifetime methods
        async mounted() {
            if (this.viewModel.token) {
                const geoFileId = Number.parseInt(this.$route.params.geoFileId);
                await this.viewModel.FetchGeoFile(geoFileId);
                this.isGeoFileVisible = true;
                await this.viewModel.InitHubConnection();
            }

            if (!this.isGeoFileVisible) return;

            await this.InitCanvas();
            this.geoFileGraphics = new PIXI.Graphics();
            this.viewport?.addChild(this.geoFileGraphics!);
            this.DrawGeoFile();

            this.viewport!.x = this.viewportX;
            this.viewport!.y = this.viewportY;

            const usersGraphics = new PIXI.Graphics();
            this.viewport?.addChild(usersGraphics);

            const commentsGraphics = new PIXI.Graphics();
            this.viewport?.addChild(commentsGraphics);

            this.viewport?.addListener("moved", async () => {
                const scale = this.viewport!.scale.x;

                await signalRService.hubConnection.invoke(
                    "UpdateViewport",
                    this.viewport!.x * -1 / this.viewport!.scale.x,
                    this.viewport!.y * -1 / this.viewport!.scale.y,
                    this.viewport!.worldScreenWidth,
                    this.viewport!.worldScreenHeight
                );

                commentsGraphics.clear();
                this.viewModel.comments.forEach(x => this.DrawComment(x, commentsGraphics));
            });

            this.viewport?.addListener("clicked", async (eventData: any) => {
                if (this.isOnAddCommentClicked) {
                    this.isAddCommentDialogShown = true;
                    this.commentX = eventData.world.x;
                    this.commentY = eventData.world.y;
                }
            });

            let isZooming = false;
            this.viewport?.addListener("zoomed-end", async () => {
                isZooming = true;

                const start = (callback: any) => {
                    setTimeout(() => {
                        if (!isZooming) {
                            isZooming = true;
                            this.f.forEach(x => x.clear());
                            this.DrawGeoFile();
                        }
                    }, 500);
                };
                start();

                isZooming = false;
            });

            this.viewport?.addListener("mousemove", async (eventData: any) => {
                if (this.isAddCommentDialogShown) return;

                const scale = this.viewport!.scale.x;

                const globalPoint: PIXI.Point = eventData.data.global;
                const worldPoint = this.viewport!.toWorld(globalPoint);

                this.commentText = "";
                this.isCommentShown = false;
                for (let i = 0; i < this.viewModel.comments.length; i++) {
                    const comment = this.viewModel.comments[i];

                    const isMouseInsideCommentArea =
                        (worldPoint.x - comment.x) ** 2 + (worldPoint.y - comment.y) ** 2
                        < (10 / scale) ** 2;
                    if (isMouseInsideCommentArea) {
                        this.commentText = comment.comment;
                        this.isCommentShown = true;
                    }
                }
            });

            signalRService.hubConnection.on(
                "UpdateComments",
                (comments: Array<CommentDto>) => {
                    this.viewModel.comments = comments;
                    commentsGraphics.clear();
                    this.viewModel.comments.forEach(x => this.DrawComment(x, commentsGraphics));
                }
            );

            signalRService.hubConnection.on(
                "UpdateUsers",
                (users: Array<UserDto>) => {
                    this.viewModel.users = users;
                    const scale = this.viewport!.scale.x;

                    usersGraphics.clear();
                    this.viewModel.users.forEach(x => {
                        if (x.id != this.viewModel.user?.id) {
                            usersGraphics
                                .lineStyle(4 / scale, x.color)
                                .drawRect(x.x, x.y, x.height, x.width);
                        }
                    });
                });
        }

        async beforeDestroy() {
            await this.viewModel.CloseHubConnection();
            window.removeEventListener("resize", this.OnWindowResize);
            this.application?.destroy()
        }

        private InitCanvas() {
            const mapCanvas = document.getElementById("mapCanvas") as HTMLCanvasElement;
            const mapContainer = this.$refs.mapContainer as HTMLElement;

            this.application = new PIXI.Application({
                view: mapCanvas,
                width: mapContainer.clientWidth,
                height: mapContainer.clientHeight - this.$vuetify.application.top,
                backgroundColor: 0xffffff,
            });
            this.viewport = new Viewport({
                screenWidth: this.application.screen.width,
                screenHeight: this.application.screen.height,

                interaction: this.application.renderer.plugins.interaction,
            });

            this.viewport.drag().pinch().wheel();
            this.application.stage.addChild(this.viewport);

            window.addEventListener("resize", this.OnWindowResize);
        }

        private OnWindowResize() {
            const mapContainer = this.$refs.mapCanvas as HTMLElement;
            this.application?.renderer.resize(mapContainer.clientWidth, mapContainer.clientHeight);
            this.viewport?.resize(mapContainer.clientWidth, mapContainer.clientHeight);
        }

        private f: Array<PIXI.Graphics> = [];
        private DrawGeoFile() {
            const scale = this.viewport!.scale.y;

            const features = this.viewModel.geoFile! as FeatureCollection;
            features.features.forEach(x => {
                const g = new PIXI.Graphics().lineStyle(1 / scale, 0x000000);
                this.viewport?.addChild(g);
                this.f.push(g);

                if (x.geometry.type == "Polygon") {
                    this.AddPolygon(x.geometry.coordinates);
                    return;
                }
                if (x.geometry.type == "MultiPolygon") {
                    this.AddMultiPolygon(x.geometry.coordinates);
                    return;
                }
            });
        }

        private AddPolygon(coordinates: Position[][]) {
            const vertices = coordinates[0]
                .map(x => proj4(ProjectionString.EPGS4326.name, ProjectionString.GOOGLE.name, x))
                .flat(1);
            this.f[this.f.length - 1].drawPolygon(vertices);

            this.viewportX = vertices[0] * -1;
            this.viewportY = vertices[1] * -1;
        }

        private AddMultiPolygon(coordinates: Position[][][]) {
            coordinates.forEach(x => this.AddPolygon(x));
        }

        private DrawComment(comment: CommentDto, graphics: Graphics) {
            const scale = this.viewport!.scale.x;
            graphics
                .beginFill(0x0000000)
                .drawCircle(comment.x, comment.y, 10 / scale)
                .endFill()
                .beginFill(0x1cf50c)
                .drawCircle(comment.x, comment.y, 8 / scale)
                .endFill();
        }

        private onResetViewportClicked() {
            this.viewport!.x = this.viewportX;
            this.viewport!.y = this.viewportY;
            this.viewport!.setZoom(1);
        }

        private async onCreateCommentClicked() {
            await signalRService.hubConnection.invoke(
                "CreateComment",
                this.commentX, this.commentY, this.comment
            );
            this.onResetCommentClicked();
        }

        private onResetCommentClicked() {
            this.isOnAddCommentClicked = false;
            this.isAddCommentDialogShown = false;
            const form = this.$refs.addCommentForm as any;
            form.reset();
        }
    }
</script>
