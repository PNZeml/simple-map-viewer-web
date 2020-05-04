<template>
  <v-container fluid class="pa-0 ma-0 fill-height" ref="mapContainer">
    <canvas id="map"/>
    <!--<v-btn v-on:click="OnSendMessageClicked">Add message</v-btn>-->
  </v-container>
</template>

<script lang="ts">
    import {ProjectionString} from "@/common/utils/ProjectionUtils";
    import signalRService from "@/domain/services/signalr/SignalRService";
    import MapWebApiServiceImpl from "@/features/map/services/MapWebApiServiceImpl";
    import {FeatureCollection, GeoJSON, Position} from "geojson";
    import {Viewport} from "pixi-viewport";
    import * as PIXI from "pixi.js";
    import proj4 from "proj4";
    import {Component, Vue} from "vue-property-decorator";
    import Application = PIXI.Application;

    @Component({name: "map"})
    export default class MapView extends Vue {
        private application?: Application;
        private viewport?: Viewport;
        private geoFile?: GeoJSON;
        private isNeedCallMessageBox = false;

        private mapService = new MapWebApiServiceImpl();

        async mounted() {
            this.SetupMapCanvas();

            const geoFileId = Number.parseInt(this.$route.params.id);
            if (geoFileId) {
                this.geoFile = await this.mapService.getGeoFile(geoFileId);
                this.Draw()
            }

            await this.StartSignalrConnection();
        }

        beforeDestroy() {
            window.removeEventListener("resize", this.HandleMapResize);
            this.application?.destroy()
        }

        private SetupMapCanvas() {
            const mapCanvas = document.getElementById("map") as HTMLCanvasElement;
            // TODO: Create class container
            const mapContainer = this.$refs.mapContainer as HTMLElement;
            this.application = new PIXI.Application({
                view: mapCanvas,
                width: mapContainer.clientWidth,
                height: mapContainer.clientHeight,
                backgroundColor: 0xffffff,
            });
            this.viewport = new Viewport({
                screenWidth: this.application.screen.width,
                screenHeight: this.application.screen.height,

                interaction: this.application.renderer.plugins.interaction,
            });
            this.viewport.drag().pinch().wheel();
            this.application.stage.addChild(this.viewport);
            window.addEventListener("resize", this.HandleMapResize)

            mapCanvas.onmousedown = this.OnMapClicked;
        }

        private HandleMapResize() {
            const mapContainer = this.$refs.mapContainer as HTMLElement;
            this.application?.renderer.resize(mapContainer.clientWidth, mapContainer.clientHeight);
            this.viewport?.resize(mapContainer.clientWidth, mapContainer.clientHeight);
        }

        private Draw() {
            const features = this.geoFile! as FeatureCollection;
            features.features.forEach(x => {
                if (x.geometry.type == "Polygon") {
                    this.AddPolygon(x.geometry.coordinates);
                    return;
                }
                if (x.geometry.type == "MultiPolygon") {
                    this.AddMultiPolygon(x.geometry.coordinates);
                    return;
                }
            })
        }

        private AddPolygon(coordinates: Position[][]) {
            const vertices = coordinates[0]
                .map(x => proj4(ProjectionString.EPGS4326.name, ProjectionString.GOOGLE.name, x))
                .flat(1);
            const polygon = new PIXI.Graphics().lineStyle(500, 0x000000).drawPolygon(vertices);
            this.viewport?.addChild(polygon);

            this.viewport!.x = vertices[0] * -1;
            this.viewport!.y = vertices[1] * -1;
        }

        private AddMultiPolygon(coordinates: Position[][][]) {
            coordinates.forEach(x => this.AddPolygon(x));
        }

        private async StartSignalrConnection() {
            await signalRService.hubConnection.start();
            signalRService.hubConnection.on("ReceiveMessage", (message) => {
                const messageGraph = new PIXI.Text(message.message);
                messageGraph.style = {fontSize: "120pt"};
                messageGraph.x = message.x;
                messageGraph.y = message.y;
                messageGraph.width = 12000;
                messageGraph.height = 10000;
                this.viewport?.addChild(messageGraph);
            })
        }

        private async OnSendMessageClicked() {
            this.isNeedCallMessageBox = true;
        }

        private async OnMapClicked(mouseEvent: MouseEvent) {
            if (!this.isNeedCallMessageBox) return;

            const clickPoint = this.viewport?.toWorld(mouseEvent.x, mouseEvent.y);
            console.log(clickPoint);
            await signalRService.hubConnection.invoke("SendMessage", clickPoint!.x, clickPoint!.y, "test");

            this.isNeedCallMessageBox = false;
        }
    }
</script>

<style lang="scss">
</style>