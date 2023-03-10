<script lang="ts">
  import { sleep } from "../assets/utils";
  import { GuitarScale } from "./store";
  import GuitarString from "./GuitarString.svelte";
  import { onMount } from 'svelte';
  let guitar:HTMLElement;
  let allnotes:Array<string>;
  GuitarScale.subscribe(value =>{
    allnotes = value;
  })
  async function populate() {
    let k:number = 0;
    for (let i = 0; i < guitar.children.length; i++) {
      for (let j = 1; j < guitar.children[0].children.length; j++) {
        guitar.children[i].children[j].id = k
        guitar.children[i].children[j].innerHTML = `${allnotes[k]}`
        k += 1
      }
    }
  }
  onMount(populate)
</script>


<div bind:this={guitar} class="contents">
<GuitarString gstring="E" />
<GuitarString gstring="A" />
<GuitarString gstring="D" />
<GuitarString gstring="G" />
<GuitarString gstring="B" />
<GuitarString gstring="E" />
</div>