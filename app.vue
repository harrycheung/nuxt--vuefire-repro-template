<script lang="ts" setup>
import { doc } from "firebase/firestore";

const db = useFirestore();
const user = useCurrentUser();

const {
  public: { vuefireVersion, nuxtVuefireVersion },
} = useRuntimeConfig();

const router = useRouter();
const route = useRoute();

console.log("useDocument", new Date().toISOString());
const { data: product } = useDocument(doc(db, "products", "product1"));
console.log("handle:", product.value?.handle);
</script>

<template>
  <h1>Nuxt + VueFire</h1>

  <NuxtPage />

  <footer>
    <code>vuefire@{{ vuefireVersion }}</code> -
    <code>nuxt-vuefire@{{ nuxtVuefireVersion }}</code>
  </footer>
</template>
