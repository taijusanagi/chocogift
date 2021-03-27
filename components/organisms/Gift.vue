<template>
  <section>
    <div class="w-full">
      <h2 class="text-center text-6xl">🎁</h2>
    </div>
    <form class="mb-8">
      <AtomsRadio :values="['31337']" :labels="['Local']" class="mb-1" />
      <AtomsLabel text="Send to" />
      <AtomsInput type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="NFT Contract Address" />
      <AtomsInput type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="NFT Token ID" />
      <AtomsInput type="number" />
    </form>
    <AtomsButton @click="onClickSend" class="w-32 mx-auto">Preview</AtomsButton>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  methods: {
    onClickSend(e: unknown) {
      this.openMessageModal({ messageText: "text", buttonText: "message", url: "ok" });
    },
    openMessageModal(props: any) {
      this.$store.commit("messageModal/open", props);
    },
    toggleLoadingOverlay() {
      this.$store.commit("loadingOverlay/toggle");
    },
    openNotificationToast(props: any) {
      this.$store.commit("notificationToast/open", props);
    }
  }
});
</script>
