var app = new Vue({
    // #app => sammma id som på diven i html
    el: '#app',
    data: {
        //? innanför {} kan "globala" data-variabler läggs till
        // * För att ändra värde på en data-variabel behöver man skriva this.variabelNamn
        responseText: "Göran funderar...",
        maxInput: 1,
        guessInputValue: 1,
        guesses: 0,
        showMessage: true,
        // slut på variabler
    },

    methods: {
        //? Funktioner ska ligga innaför här (och det behöver inte stå function framför)
        startBaby() {
            // TODO
            this.showMessage = !this.showMessage
        }, //! Det måste vara komma-tecken efter varje funktion

        guessing() {
            //? Tidigare behövde vi hämde den såhär...
            // var guess = Number(document.getElementById("guessId").value)
            //? nu kan vi ta den direkt från variabeln
            var guess = this.guessInputValue
            this.guesses += 1;
            // TODO 
            //setResponseText("Göran funderar...")
            setTimeout(function() {
                // TODO Fortsätt här
                // controll(guess)
            }, this.getRndInteger(300, 3000))
            console.log("Gissningar", this.guesses)
        },

        setResponseText(responseText) {
            //? Gamle sättet
            // document.getElementById("responseId").innerText = responseText;
            // Nye sättet
            this.responseText =  responseText;
        },

        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        // Slut på funktioner
    }
});
