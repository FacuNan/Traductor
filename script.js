import languages from "./languages.js";
/*traductor de idiomas*/

const selectFirst = document.querySelector(".first")
const selectSecond = document.querySelector(".second")
const traducir= document.querySelector('.translate')
const fromText = document.querySelector(".fromText")
const toText = document.querySelector(".toText")
const cambio=document.getElementById('change')
const readme=document.querySelectorAll('.read')
const listen = document.querySelector(".listen")
const language1 = "es-ES"
const language2 = "en-GB"




for (const i in languages) {
    const key = Object.keys(languages[i]).toString()/*lenguaje inicial*/
    const value = Object.values(languages[i]).toString()/*lenguaje a traducir*/
    selectFirst.innerHTML += `<option value=${key}>${value}</option>`/*Se gragan los idimoas a los botones*/
    selectSecond.innerHTML += `<option value=${key}>${value}</option>`
}
selectFirst.value = language1/*estado inicial de los botones de traduccion*/
selectSecond.value = language2


/*imprime por pantalla la traduccion*/
traducir.addEventListener('click', async _=>{

    const res = await fetch(`https://api.mymemory.translated.net/get?q=${fromText.value}&langpair=${selectFirst.value}|${selectSecond.value}`)
    const data = await res.json()
    toText.value = data.responseData.translatedText

})


fromText.addEventListener('keyup', async (e)=>{
    var texto= e.path[0].value
 
    const respuesta = await fetch(`https://api.mymemory.translated.net/get?q=${texto}&langpair=${selectFirst.value}|${selectSecond.value}`)
    const data = await respuesta.json()
    toText.value=(data.responseData.translatedText)
})

cambio.addEventListener('click', _=>{
    const seleccion1=selectFirst.value
    const cambioTexto=fromText.value

    selectFirst.value=selectSecond.value
    selectSecond.value=seleccion1

    fromText.value=toText.value
    toText.value=cambioTexto
   
});

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()

readme.forEach((read,index)=>{
    read.addEventListener("click",_=>{
        const textToRead = index == 0 ? fromText.value : toText.value
        if(!toText.value)return
        speechSynthesis.speak(new SpeechSynthesisUtterance(textToRead))
    console.log(textToRead)
    })
});

recognition.onresult = (event)=>{
    fromText.value = event.results[0][0].transcript
}

listen.addEventListener("click",_=>{
    recognition.start()
})

/*eventos click para que aparezca el input del texto*
var text = document.getElementById('texto');
text.addEventListener('keyup', (event) => {
    var inputText = event.path[0].value
    document.querySelector('.toUpper').innerText = inputText;
});


var desaparece = document.getElementById('texto');
desaparece.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        desaparece.style.display = 'none';
    } else {
        console.log('prueba de nuevo')
    }



})


var button = document.querySelector('.button')

button.addEventListener('click', (e) => {
    if (e.type == 'click' && text.style.display == 'none') {
        text.style.display = '';
    } else {
        text.style.display = 'none'
    }
})*/