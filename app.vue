<script lang="ts" setup>
import { doc } from "firebase/firestore";

const db = useFirestore();
const user = useCurrentUser();

const {
  public: { vuefireVersion, nuxtVuefireVersion },
} = useRuntimeConfig();

const router = useRouter();
const route = useRoute();

await useAsyncData("product", async (): Promise => {
  try {
    console.log("useDocument", new Date().toISOString());
    const db = useFirestore();
    const { data: product, promise: promise } = useDocument(
      doc(db, "products", "bmYXDI4VNPNPiAF4Y3Nt")
    );
    await promise;
    console.log("handle:", product.value?.handle);

    return product.value;
  } catch (error) {
    console.error("Error fetching document: ", error);
  }

  return null;
});
</script>

<template>
  <h1>Nuxt + VueFire</h1>

  <NuxtPage />

  <footer>
    <code>vuefire@{{ vuefireVersion }}</code> -
    <code>nuxt-vuefire@{{ nuxtVuefireVersion }}</code>
  </footer>
</template>
