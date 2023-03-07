<script lang="ts">
  import { sleep } from "../assets/utils";
  import { scl } from "./store";
  export let scale:string;
  async function Say(){
    let board = document.getElementById("Board")
    board.style.opacity = "0"
    await sleep(500)
    board.classList.add("hidden")
    document.getElementById("game").classList.remove("hidden")
    document.getElementById("game").classList.add("flex")
    document.getElementById("game").style.opacity = "1"
    scl.set(scale)
  }
</script>

<button on:click={Say} class="btn text-2xl">
  {scale}
</button>
