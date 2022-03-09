<script>
  import { fly, scale, blur } from "svelte/transition";
  import { drag } from "./drag";
  export let toggleModal;
</script>

<div class="modal">
  <div class="card" transition:fly={{ y: 40 }} use:drag>
    <button class="drawer--close" on:click={toggleModal}>&times;</button>
    <slot />
  </div>
  <div class="background" in:scale={{ start: 1.2, duration: 800 }} out:blur />
</div>

<style>
  .modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .card {
    position: relative;
    text-align: center;
    z-index: 101;
  }
  .background {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      142deg,
      var(--darkBlue) 3.62%,
      var(--grey) 100%
    );
    opacity: 0.8;
    z-index: 100;
  }
</style>
