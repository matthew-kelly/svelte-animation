<script>
  import { custom } from "./custom";
  import { alert } from "./alert";

  import { fade } from "svelte/transition";
  import Nav from "./Nav.svelte";
  import Toast from "./Toast.svelte";
  import Modal from "./Modal.svelte";
  import Box from "./Box.svelte";
  // Svelte transitions
  // ------------------
  // Fade - opacity
  // Blur - opacity and blur
  // Fly - x and y along with opacity
  // Slide - height
  // Scale - start: scale, opacity
  // Draw - draw svg paths

  export let name;

  let isReady = false;
  let isNavOpen = false;
  let isModalOpen = false;

  function toggleNav() {
    isNavOpen = !isNavOpen;
  }

  function toggleAlert() {
    alert.set({
      isActive: true,
      text: "New alert!",
    });
  }

  function toggleModal() {
    isModalOpen = !isModalOpen;
  }
</script>

<main>
  {#if isNavOpen}
    <Nav {toggleNav} />
  {/if}

  <button on:click={toggleNav}>Menu</button>
  <button on:click={toggleAlert}>Alert</button>
  <button on:click={toggleModal}>Modal</button>
  <button on:click={() => (isReady = !isReady)}>!isReady</button>

  {#if isReady}
    <h1 transition:custom={{ delay: 500 }}>Hello {name}!</h1>
  {/if}

  <Toast />

  {#if isModalOpen}
    <Modal {toggleModal}>
      <p>This is in the slot</p>
      <button disabled>Do something</button>
    </Modal>
  {/if}

  <Box />
</main>

<style>
  .hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
</style>
