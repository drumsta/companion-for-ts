import { defineNuxtPlugin } from '#app';
//import * as components from 'quasar';
import { QKnob, Quasar } from 'quasar';

export default defineNuxtPlugin((nuxtApp): void => {
  const quasarUserOptions = {
    components: [QKnob],
    plugins: {},
  };

  // https://github.com/quasarframework/quasar/blob/dev/ui/src/install-quasar.js#L43
  nuxtApp.vueApp.use(Quasar, quasarUserOptions);
});
