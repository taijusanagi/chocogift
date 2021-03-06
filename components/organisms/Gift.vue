<template>
  <section>
    <div class="w-full mb-8">
      <div v-if="image" class="h-20 w-20 mx-auto relative">
        <h2 absolute class="absolute top-0 right-0 px-1 opacity-75">🎁</h2>
        <img class="h-full w-full" :src="image" />
      </div>
      <h2 v-else class="h-20 w-20 mx-auto text-center text-6xl">🎁</h2>
    </div>
    <form class="mb-8">
      <AtomsRadio v-model="chainId" :values="chainIdValues" :labels="chainIdLabels" class="mb-1" />
      <AtomsLabel text="Send to" />
      <AtomsInput v-model="sendToAddress" type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="NFT Contract Address" />
      <AtomsInput v-model="nftContractAddress" type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="NFT Token ID" />
      <AtomsInput v-model="tokenId" type="number" />
    </form>
    <AtomsButton @click="send" class="w-32 mx-auto">Gift</AtomsButton>
  </section>
</template>

<script lang="ts">
import Vue from "vue";

import {
  initializeWeb3Modal,
  getEthersSigner,
  getContractsForChainId,
  getNetworkNameFromChainId,
  chainIdLabels,
  chainIdValues,
} from "@/modules/web3";

export default Vue.extend({
  data: () => {
    return {
      chainIdValues,
      chainIdLabels,
      chainId: chainIdValues[0],
      sendToAddress: "",
      nftContractAddress: "",
      tokenId: "",
      image: "",
    };
  },
  methods: {
    async send(e: unknown) {
      this.toggleLoadingOverlay();
      try {
        const { chainId, sendToAddress, nftContractAddress, tokenId } = this;
        const provider = await initializeWeb3Modal();
        const signer = await getEthersSigner(provider);
        const signerNetwork = await signer.provider.getNetwork();
        if (chainId != signerNetwork.chainId.toString()) {
          const networkName = getNetworkNameFromChainId(chainId);
          this.openNotificationToast({ type: "error", text: `Please connect ${networkName} network` });
          this.toggleLoadingOverlay();
          return;
        }
        const { erc721Contract, explore } = getContractsForChainId(chainId);
        const attachedNftContract = erc721Contract.attach(nftContractAddress);
        const userAddress = await signer.getAddress();
        const owner = await attachedNftContract.ownerOf(tokenId);
        if (userAddress.toLowerCase() != owner.toLowerCase()) {
          this.openNotificationToast({ type: "error", text: `Selected account is not NFT owner` });
          this.toggleLoadingOverlay();
          return;
        }
        let tokenURI = await attachedNftContract.tokenURI(tokenId);
        if (tokenURI.substring(0, 4) == "ipfs") {
          const cid = tokenURI.split("//")[1];
          tokenURI = `https://ipfs.io/ipfs/${cid}`;
        }
        try {
          const data = await this.$axios.$get(tokenURI);
          const { image } = data;
          this.image = image;
        } catch (err) {
          console.log(err);
        }
        const { hash } = await attachedNftContract.connect(signer).transferFrom(userAddress, sendToAddress, tokenId);
        this.toggleLoadingOverlay();
        this.openMessageModal({
          messageText: "Transaction submitted!",
          buttonText: "Check",
          url: `${explore}tx/${hash}`,
        });
      } catch (err) {
        this.toggleLoadingOverlay();
        this.openNotificationToast({ type: "error", text: err.message });
      }
    },
    openMessageModal(props: any) {
      this.$store.commit("messageModal/open", props);
    },
    toggleLoadingOverlay() {
      this.$store.commit("loadingOverlay/toggle");
    },
    openNotificationToast(props: any) {
      this.$store.commit("notificationToast/open", props);
    },
  },
});
</script>
