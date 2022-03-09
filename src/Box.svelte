<script>
  import { drag } from "./drag";
</script>

<div class="box" use:drag={{ direction: "x" }} />
<div class="box" use:drag={{ direction: "y" }} />
<div class="box" use:drag />

<style>
  .box {
    background: var(--primary);
    box-shadow: var(--level-3);
    height: 100px;
    width: 100px;
    transform-style: preserve-3d;
  }
</style>
