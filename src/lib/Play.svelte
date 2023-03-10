<script lang="ts">
  import { onMount } from 'svelte';
  import { scl } from "./store";
  import { scaledic } from '../assets/utils';
  import { GuitarScale } from './store';
  import { animateCSS } from '../assets/utils';
  import { AnsNote } from './store';
  import Guitar from './Guitar.svelte';
  import { pauser } from '../assets/utils';
  import { ansscale } from '../assets/utils';
    let ScaleList:Array<string>;
    let timeout = parseFloat("2").toFixed(2);
    let state:string = "Start";
    var currnote:string;
    let counter:HTMLElement;
    let statelem:HTMLElement;
    let upper:HTMLElement;
    let guitar:HTMLElement;
    let duration:number = 20 ;
    let iamstillinside:string;
    let scale:string;
    let finalnote:string;
    function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
    async function note(Sc:Array<string>) {
        if (state == "Stop" || iamstillinside == "yes"){
            statelem.classList.replace("btn-secondary","btn-primary")
            counter.classList.replace("btn-primary","btn-secondary")
            state = "Start"
            return
        }
        statelem.classList.replace("btn-primary","btn-secondary")
        state = "Stop"
        while (true){
            if (state == "Start"){
                break
            }
            // THE NOTE SEGMENT
            counter.classList.replace("btn-secondary","btn-primary")
            currnote = Sc[Math.floor(Math.random()*Sc.length)];
            AnsNote.set(currnote)
            for(let i = duration*100;i>0;i -= 10)
            {   if (state == "Start"){
                    timeout = parseFloat((duration/10).toString()).toFixed(2)
                    break
                }
                await sleep(100)
                timeout = parseFloat((i/1000).toString()).toFixed(2);
                if (i < 500){
                    counter.classList.replace("btn-primary","btn-error");
                    animateCSS(counter,"shakebutt");
                }
            }
            if (state == "Start"){
                counter.classList.replace("btn-error","btn-secondary");
                break
            }
            timeout = "0.00"
            counter.classList.replace("btn-error","btn-primary");
            // THIS IS THE ANS SEGMENT
            finalnote = ansscale[scale][ScaleList.indexOf(currnote)]
            document.getElementById(`${finalnote}`).classList.replace('text-blue-400','text-blue-600')
            document.getElementById(`${finalnote}`).style.background = "yellow"
            await sleep(100)
            upper.style.opacity = "0"
            await sleep(500)
            upper.classList.replace("flex","hidden")
            guitar.classList.replace("hidden","flex")
            await sleep(100)
            guitar.classList.replace("opacity-0","opacity-100");
            await sleep(500)
            counter.classList.replace("btn-error","btn-primary");
            for (let i = duration*100;i>0;i-= 10){
                if (state == "Start"){
                        timeout = parseFloat((i/1000).toString()).toFixed(2)
                        iamstillinside = "yes"
                        await pauser(statelem)
                        iamstillinside = "no"
                        state = "Stop"
                        statelem.classList.replace("btn-primary","btn-secondary")
                    }
                    await sleep(100)
                    timeout = parseFloat((i/1000).toString()).toFixed(2);
                    if (i < 500){
                        counter.classList.replace("btn-primary","btn-error");
                        animateCSS(counter,"shakebutt");
                }
            }
            timeout = "0.00"
            await sleep(100)
            counter.classList.replace("btn-error","btn-primary");
            guitar.classList.replace("opacity-100","opacity-0");
            await sleep(500)
            guitar.classList.replace("flex","hidden")
            upper.classList.replace("hidden","flex")
            await sleep(100)
            upper.style.opacity = "1"
            await sleep(500)
            try {
                document.getElementById(`${finalnote}`).classList.replace('text-blue-600','text-blue-400')
                document.getElementById(finalnote).style.background = ""
            } catch (error) {
                console.log("oh")
            }        
        }
    }

    function setdur(){
        timeout = parseFloat((duration/10).toString()).toFixed(2);
        state = "Start"
    }

    function start(){
        scl.subscribe(value =>{
                ScaleList = scaledic[value]
                currnote = value;
                scale = value;
                console.log(ScaleList)
        })
        duration = 20;
    }
    async function end(){
        state = "Start"
        document.getElementById("game").style.opacity = "0"
        await sleep(500)
        document.getElementById("game").classList.add("hidden")
        document.getElementById("game").classList.remove("flex")
        let board = document.getElementById("Board")
        board.classList.remove("hidden")
        board.style.opacity = "1"
    }
    onMount(start)
</script>

<div class="flex flex-col gap-10 justify-evenly items-center w-full pb-7">
    <div bind:this={guitar} class="hidden h-[21rem] flex-col gap-12 w-full transition-opacity duration-500 opacity-0">
        <div class="h-2 w-full flex rounded-lg justify-between items-center"> 
            <div class="h-7 w-7 sm:h-10 sm:w-10 rounded-full text-xl flex items-center justify-center">Open</div>
            <div class="h-7 w-7 sm:h-10 sm:w-10 rounded-full text-xl flex items-center justify-center">1</div>
            <div class="h-7 w-7 sm:h-10 sm:w-10 rounded-full text-xl flex items-center justify-center">2</div>
            <div class="h-7 w-7 sm:h-10 sm:w-10 rounded-full text-xl flex items-center justify-center">3</div>
            <div class="h-7 w-7 sm:h-10 sm:w-10 rounded-full text-xl flex items-center justify-center">4</div>
        </div>
        <Guitar />
    </div>
    <div bind:this={upper} class="flex flex-col justify-evenly h-[21rem] items-center w-full md:w-3/5 gap-8 transition-opacity duration-500 ease-out">
        <button class="btn w-full btn-secondary btn-outline border-2 text-xl opacity-70 hover:opacity-100 normal-case" on:click={end}>
            &lt; Back
        </button>       
        <input type="range" min="1" max="100" bind:value={duration} on:input={setdur} class="range range-info" />
        <span class="text-8xl font-semibold text-center text-a pb-3">{currnote ?? scl}</span>
    </div>
    <div class="flex w-full md:w-3/5">
        <div class="h-20 w-[45%] flex-grow btn btn-outline border-2 btn-primary text-xl bg-base-300 rounded-box" bind:this={statelem} on:click={() => note(ScaleList)} on:keydown={() => note(ScaleList)}>{state}</div>
        <div class="divider w-[5%] divider-horizontal"></div>
        <div class="h-20 w-[45%] flex-grow btn btn-outline border-2 btn-secondary text-xl bg-base-300 rounded-box font-mono" bind:this={counter} on:click={() => note(ScaleList)} on:keydown={() => note(ScaleList)}> {timeout} </div>
    </div>
</div>
<div class="hidden shakebutt"></div>

<style>
    .shakebutt {
        animation: headShake 200ms ease-in-out 1 !important;
    }
</style>