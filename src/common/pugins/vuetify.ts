import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

const preset = {
    theme: {
        dark: false,
        themes: {
            light: {
                primary: colors.indigo.base
            }
        },
    },
};

const vuetify = new Vuetify(preset);

export default vuetify;