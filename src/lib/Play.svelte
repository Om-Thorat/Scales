<script lang="ts">
  import { onMount } from 'svelte';
  import { scl } from "./store";
  import {scaledic} from "./store";
    let ScaleList:Array<string>;
    let timeout = parseFloat("2").toFixed(2);
    let state:string = "Start";
    var currnote:string;
    let counter:HTMLElement;
    let statelem:HTMLElement;
    let duration:number = 20 ;
    function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}
    async function note(Sc:Array<string>) {
        if (state == "Stop"){
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
            counter.classList.replace("btn-secondary","btn-primary")
            currnote = Sc[Math.floor(Math.random()*Sc.length)];
            for(let i = duration*100;i>0;i -= 10)
            {   if (state == "Start"){
                    timeout = parseFloat(duration/10).toFixed(2)
                    break
                }
                await sleep(100)
                timeout = parseFloat(i/1000).toFixed(2);
                if (i < 1000){
                    counter.classList.replace("btn-primary","btn-error");
                }
            }
        counter.classList.replace("btn-error","btn-primary");
        }
    }

    function setdur(){
        timeout = parseFloat(duration/10).toFixed(2);
        state = "Start"
    }

    function start(){
        scl.subscribe(value =>{
            scaledic.subscribe(dic =>{
                ScaleList = dic[value]
                console.log(ScaleList)
            }
            )
        })
        duration = 20;
        currnote = ScaleList[0];
        console.log("bruh")
    }
    async function end(){
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
    <div class="flex flex-col items-center w-full md:w-3/5 gap-8">
        <button class="btn w-full btn-secondary btn-outline border-2 text-xl opacity-70 hover:opacity-100 normal-case" on:click={end}>
            &lt; Back
        </button>       
        <input type="range" min="1" max="100" bind:value={duration} on:input={setdur} class="range range-info" />
    </div>
    <span class="text-7xl font-semibold text-center text-a pb-3">{currnote ?? "C"}</span>
    <div class="flex w-full md:w-3/5">
        <div class="h-20 w-[45%] flex-grow btn btn-outline border-2 btn-primary text-xl bg-base-300 rounded-box" bind:this={statelem} on:click={() => note(ScaleList)} on:keydown={() => note(ScaleList)}>{state}</div>
        <div class="divider w-[5%] divider-horizontal"></div>
        <div class="h-20 w-[45%] flex-grow btn btn-outline border-2 btn-secondary text-xl bg-base-300 rounded-box font-mono" bind:this={counter} on:click={() => note(ScaleList)} on:keydown={() => note(ScaleList)}> {timeout} </div>
    </div>
</div>