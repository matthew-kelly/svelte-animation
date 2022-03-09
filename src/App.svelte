<script>
  import { custom } from "./custom";
  import { alert } from "./alert";

  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
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
  let isCardActive = false;
  let y;

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

  // onMount(() => {
  //   // register scroll event
  //   addScrollEvent();
  // });

  // function addScrollEvent() {
  //   window.addEventListener("scroll", onScroll, { passive: true });
  // }

  // function onScroll() {
  //   const scrollPosition = window.pageYOffset;
  //   if (scrollPosition > 180) {
  //     isCardActive = true;
  //   }
  // }

  $: if (y > 180) {
    isCardActive = true;
  }
</script>

<svelte:window bind:scrollY={y} />

{#if isNavOpen}
  <Nav {toggleNav} />
{/if}

<main>
  <button on:click={toggleNav}>Menu</button>
  <button on:click={toggleAlert}>Alert</button>
  <button on:click={toggleModal}>Modal</button>
  <button on:click={() => (isReady = !isReady)}>!isReady</button>

  {#if isReady}
    <h1 transition:custom={{ delay: 500 }}>Hello {name}!</h1>
  {/if}

  {#if isModalOpen}
    <Modal {toggleModal}>
      <p>This is in the slot</p>
      <button disabled>Do something</button>
    </Modal>
  {/if}

  <Box />

  <div class="card">
    <h3>Card</h3>
    <p>I'm filling space!</p>
  </div>
  <div class="card" class:hidden={!isCardActive}>
    <h3>Second Card</h3>
    <p>I'm filling space! But only if isCardActive!</p>
  </div>
  <div class="card">
    <h3>Card</h3>
    <p>I'm filling space!</p>
  </div>
  <div class="card">
    <h3>Card</h3>
    <p>I'm filling space!</p>
  </div>
  <div class="card">
    <h3>Card</h3>
    <p>I'm filling space!</p>
  </div>
</main>

<Toast />

<style>
  .hidden {
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .card {
    transition: opacity 0.3s ease;
    margin-bottom: 1rem;
  }
</style>
