<template>
  <section>
    <form class="mb-8">
      <AtomsRadio :values="['31337']" :labels="['Local']" class="mb-1" />
      <AtomsLabel text="Send to" />
      <AtomsInput type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="NFT Contract Address" />
      <AtomsInput type="text" placeholder="0x..." class="mb-2" />
      <AtomsLabel text="NFT Token ID" />
      <AtomsInput type="number" />
    </form>
    <AtomsButton class="w-32 mx-auto">Preview</AtomsButton>
  </section>
</template>
