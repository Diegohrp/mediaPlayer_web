
const VERSION = "v1";
//Self es un this pero en sw
//Se añade el evento install para descargar los archivos "instalarlos"
self.addEventListener("install",(event:any) =>{
    //Esperar hasta que se crea un precaché 
    //event.waitUntil(precache());
});

//Añadir un evento fetch (Obtener los archivos)
self.addEventListener("fetch",(event:any) =>{
    const request = event.request;
    //Sólo se desea el método GET (obtención de datos);
    if(request.method != "GET"){
        return;
    }

    //Buscar en cache si se tiene la peticion 
    event.respondWith(cachedResponse(request));

    //actualizar cache 
    event.waitUntil(updateChache(request));
})

async function precache(){
    //Regresa una promesa, abre un caché 
    const cache = await caches.open(VERSION);
    //Carga en el caché todos los archivos deseados que funcionen offline
    return cache.addAll([
        /*  '/',
        './index.html',
        './index.ts',
        './assets/MediaPlayer.ts',
        './assets/plugins/autoPause.ts',
        './assets/plugins/autoPlay.ts',
        './assets/index.css',
        './assets/BigBuckBunny_512kb.mp4' */
        
    ]);
}

async function cachedResponse(request:Request){
    //abrir la caché
    const cache = await caches.open(VERSION);
    //Pregunta al caché si tiene una copia que le corresponde al request
    const response = await cache.match(request);
    return response || fetch(request); //Si no está en caché hace la petición a internet. 
}

async function updateChache(request:Request){
    //Abrir la caché
    const cache = await caches.open(VERSION);
    //Pregunta al caché si tiene una copia que le corresponde a request
    try{
        const response = await fetch(request);
        //Únicamente actualiza la caché si el status del reques es 200 (se ha recibido por completo)
        if(response.status == 200){
            return cache.put(request,response);
        }
    }
    catch{
        console.log("No se puede actualizar caché en modo offline");
    }
}