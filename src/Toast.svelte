<script>
  import { onDestroy } from "svelte";

  import { fly } from "svelte/transition";
  import { alert } from "./alert";

  function closeAlert() {
    alert.set({
      text: $alert.text,
      isActive: false,
    });
  }

  const unsubscribe = alert.subscribe((value) => {
    if (value.isActive) {
      setTimeout(closeAlert, 3000);
    }
  });

  onDestroy(unsubscribe);
</script>

{#if $alert.isActive}
  <div class="toast" transition:fly={{ y: 100 }} on:click={closeAlert}>
    <p>{$alert.text}</p>
  </div>
{/if}

<style>
  .toast {
    color: white;
    background: var(--black);
    border-radius: var(--borderRadius);
    padding: 20px;
    box-shadow: var(--level-2);
    position: fixed;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }

  .toast p {
    text-align: center;
    margin: 0;
    max-width: 100%;
  }
</style>
