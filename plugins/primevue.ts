// import PrimeVue from 'primevue/config';
import Knob from 'primevue/knob';
import Slider from 'primevue/slider';

export default defineNuxtPlugin((nuxtApp): void => {
  // nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component('Knob', Knob);
  nuxtApp.vueApp.component('Slider', Slider);
});
