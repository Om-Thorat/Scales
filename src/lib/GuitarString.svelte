<script lang="ts">
    export let gstring:string;
    import Dot from "./Dot.svelte";
</script>

<div class="h-2 w-full bg-emerald-400 flex rounded-lg justify-between items-center"> 
    <div class="absolute -translate-x-6 text-2xl">{gstring}</div>
    <Dot />
    <Dot />
    <Dot />
    <Dot />
</div>