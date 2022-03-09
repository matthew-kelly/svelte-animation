<script>
  import { fly } from "svelte/transition";

  export let toggleNav;
</script>

<nav transition:fly={{ x: 100 }}>
  <a href="#" on:click={toggleNav}>Home</a>
  <a href="#" on:click={toggleNav}>About</a>
  <a href="#" on:click={toggleNav}>Services</a>
  <a href="#" on:click={toggleNav}>Contact</a>
</nav>

<style>
  nav {
    position: fixed;
    inset: 0;
    background: var(--black);
    padding: 40px;
    box-shadow: var(--level-3);
  }

  a {
    display: block;
    font-size: 3em;
    color: white;
    font-weight: bold;
  }
</style>
