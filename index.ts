import {MediaPlayer} from "@diegohp/mediaplayer";
import { AdsPlugin } from "@diegohp/mediaplayer/src/plugins/ads/adsPlugin";
import { AutoPause } from "@diegohp/mediaplayer/src/plugins/autoPause";
import { AutoPlay } from "@diegohp/mediaplayer/src/plugins/autoPlay";

const video:HTMLVideoElement = document.querySelector("video");
const play:HTMLElement = document.getElementById("play");
const mute:HTMLElement = document.getElementById("mute");

const player:MediaPlayer = new MediaPlayer({media:video,plugins:[new AutoPlay(),new AutoPause(),new AdsPlugin()]});

play.onclick = () =>{
    player.playPause();
}

mute.onclick = () =>{
    player.muteUnmute();
}

if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/sw.ts").catch(error =>{
        console.error(error);
    });
}
