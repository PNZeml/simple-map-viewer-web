import "reflect-metadata";
import App from "@/App.vue";
import ProjectionUtils from "@/common/utils/ProjectionUtils";
import Vue from "vue";
import VueMoment from "vue-moment";
import router from "@/common/pugins/router";
import store from "@/common/pugins/store";
import vuetify from "@/common/pugins/vuetify";
import {AppModule} from "@/ioc/AppModule";

class AppBootstrap {
    constructor() {
        this.setupUtils();
        this.setupIoC();
        this.setupVuePlugins();
        this.setupVue();
    }

    private setupUtils() {
        ProjectionUtils.RegisterProjections();
    }

    private setupIoC() {
        AppModule;
    }

    private setupVuePlugins(): void {
        Vue.use(VueMoment);
    }

    private setupVue(): void {
        Vue.config.productionTip = false;
        new Vue({
            router,
            store,
            vuetify,
            render: x => x(App)
        }).$mount("#app");
    }
}

new AppBootstrap();
