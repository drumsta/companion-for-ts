// import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Knob from 'primevue/knob';

export default defineNuxtPlugin((nuxtApp): void => {
  // nuxtApp.vueApp.use(PrimeVue);
  nuxtApp.vueApp.component('Knob', Knob);
  nuxtApp.vueApp.component('Button', Button);
});
