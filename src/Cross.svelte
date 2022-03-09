<script>
  import { crossfade, fade } from "svelte/transition";
  import { flip } from "svelte/animate";

  let todo = [
    {
      id: 1,
      isDone: false,
      text: "Wake up",
    },
    {
      id: 2,
      isDone: false,
      text: "Fall out of bed",
    },
    {
      id: 3,
      isDone: false,
      text: "Drag a comb across my head",
    },
  ];

  const [send, receive] = crossfade({
    fallback: fade,
  });
</script>

<div class="wrapper">
  <div class="card">
    <h3>Not Done</h3>
    <ul>
      {#each todo.filter((item) => !item.isDone) as item (item.id)}
        <li
          in:receive={{ key: item.id }}
          out:send={{ key: item.id }}
          animate:flip
        >
          <label>
            <input type="checkbox" bind:checked={item.isDone} />
            {item.text}
          </label>
        </li>
      {/each}
    </ul>
  </div>

  <div class="card">
    <h3>Done</h3>
    <ul>
      {#each todo.filter((item) => item.isDone) as item (item.id)}
        <li
          in:receive={{ key: item.id }}
          out:send={{ key: item.id }}
          animate:flip
        >
          <label>
            <input type="checkbox" bind:checked={item.isDone} />
            {item.text}
          </label>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    margin: 0;
    padding: 0;
  }
</style>
