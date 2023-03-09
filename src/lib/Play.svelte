<script lang="ts">
  import { onMount } from 'svelte';
  import { scl } from "./store";
  import {scaledic} from "./store";
  import { GuitarScale } from './store';
  import { animateCSS } from '../assets/utils';
  import { AnsNote } from './store';
  import Guitar from './Guitar.svelte';
  import { pauser } from '../assets/utils';
  import { now } from 'svelte/internal';
    let ScaleList:Array<string>;
    let timeout = parseFloat("2").toFixed(2);
    let state:string = "Start";
    let scale;
    var currnote:string;
    let counter:HTMLElement;
    let statelem:HTMLElement;
    let upper:HTMLElement;
    let guitar:HTMLElement;
    let duration:number = 20 ;
    let iamstillinside:string;
    let gscale:Array<string>;
    let notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
    let dots = ['Ċ', 'Ċ#', 'Ḋ', 'Ḋ#', 'Ė', 'Ḟ', 'Ḟ#', 'Ġ', 'Ġ#', 'Ȧ', 'Ȧ#', 'Ḃ']
    let finalnote;
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
                console.log(currnote)
                if (dots.includes(currnote)){
                    console.log("cool")
                    var nownote = notes[dots.indexOf(currnote)] 
                    var q = dots.indexOf(scale)
                    var uh = 0
                    console.log(q,nownote)
                    for (let i = 8+q; i < gscale.length; i++) {
                        const element = gscale[i];
                        console.log(element)
                        if (element == nownote){
                            uh += 1;
                            console.log(gscale[i],uh)
                            if (uh == 2){
                                finalnote = i
                                if (finalnote == 19){
                                    finalnote += 1
                                }
                                break
                            }
                        }
                    }
                }
                else{
                    var q = notes.indexOf(scale)
                    console.log(q)
                    for (let i = 8+q;i < gscale.length;i++){
                        const element = gscale[i];
                        if (element == currnote){
                            finalnote = i;
                            if (finalnote == 19){
                                    finalnote += 1
                            }
                            break
                        }
                    }
                }
                console.log(finalnote)
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
            scaledic.subscribe(dic =>{
                ScaleList = dic[value]
                currnote = value;
                scale = value;
                console.log(ScaleList)
            }
            )
        })
        GuitarScale.subscribe(u =>{
        gscale = u;
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

<div class="flex flex-col gap-10 justify-evenly items-center w-full">
    <div bind:this={guitar} class="hidden h-80 flex-col gap-12 w-full transition-opacity duration-500 opacity-0">
        <Guitar />
    </div>
    <div bind:this={upper} class="flex flex-col justify-evenly h-80 items-center w-full md:w-3/5 gap-8 transition-opacity duration-500 ease-out">
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