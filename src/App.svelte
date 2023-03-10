<script lang="ts">
  import Scale from './lib/Scale.svelte'
  import Play from './lib/Play.svelte'
</script>

<main class="h-[100svh] min-h-[100svh] flex flex-col items-center gap-10">
  <a href="https://github.com/Om-Thorat/Scales">
  <div class="alert bg-transparent pt-5 md:pt-0 md:w-fit md:absolute md:right-3 md:top-6 items-center justify-center">
    <span>
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" fill="#0fa4e9" version="1.1" width="16" data-view-component="true" class="scale-125 mr-2"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
      <span>Star me on Github</span>
    </span>
  </div>
  </a>
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