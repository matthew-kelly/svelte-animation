<script>
  import { drag } from "./drag";
  import { fade } from "svelte/transition";

  let isVisible = true;

  function handleDragStop(event) {
    if (event.detail.x > 300) {
      isVisible = false;
    }
  }
</script>

<!-- <div class="box" use:drag={{ direction: "x" }} />
<div class="box" use:drag={{ direction: "y" }} /> -->
{#if isVisible}
  <div class="box" transition:fade use:drag on:dragStop={handleDragStop} />
{/if}
<div
  class="box"
  transition:fade
  use:drag={{ reset: false, direction: "x" }}
  on:dragStop={handleDragStop}
  style="background-color: blue"
/>
<div
  class="box"
  transition:fade
  use:drag={{ test: "red" }}
  on:dragStop={handleDragStop}
  style="background-color: red"
/>

<style>
  .box {
    background: var(--primary);
    box-shadow: var(--level-3);
    height: 100px;
    width: 100px;
    transform-style: preserve-3d;
  }
</style>
