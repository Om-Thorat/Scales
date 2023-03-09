<script lang="ts">
  import Scale from './lib/Scale.svelte'
  import Play from './lib/Play.svelte'
</script>

<main class="h-[100svh] min-h-[100svh] flex flex-col items-center gap-10">
  <div class="hero h-1/4 min-h-20 max-md:landscape:h-fit md:h-[27%] pt-5">
    <div class="text-4xl h-20 min-h-[5rem] text-center w-4/5 md:w-full md:text-6xl md:h-1/4 cool-title font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#12c2e9] via-[#c471ed] to-[#f64f59]">Practice your Scalesss</div>
  </div>
  <div id="Board" class="transition-all duration-500 grid grid-cols-3 w-3/4 sm:grid-cols-4 gap-4 md:w-1/2">
    <Scale scale="C"/>
    <Scale scale="C#"/>
    <Scale scale="D"/>
    <Scale scale="D#"/>
    <Scale scale="E"/>
    <Scale scale="F"/>
    <Scale scale="F#"/>
    <Scale scale="A"/>
    <Scale scale="A#"/>
    <Scale scale="G"/>
    <Scale scale="G#"/>
    <Scale scale="B"/>
  </div>
  <div id="game" class="opacity-0 transition-all duration-500 hidden h-fit w-4/5 md:w-1/2" >
  <Play/>
  </div>
</main>

<style>
  .cool-title{
    background-size: 200%;
    animation: title 5s ease-in-out infinite forwards;
  }

  @keyframes title{
    from,to{background-position-x: 0%;}
    50%{background-position-x: 100%;}
  }

  div{
    @apply transition-all;
  }
</style>