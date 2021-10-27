var app = new Vue({
    el: '#app',
    data: {
        responseText: "Vad tänker Göran på?",
        maxInput: 1,
        guessInputValue: 1,
        guesses: 0,
        gaming: false,
        goransNumber: null,
        menu: true,
        guessButton: true,
    },

    methods: {

        startGame(max) {
            this.guessButton = true
            this.setResponseText("Vilket tal 1-" + max + " tänker Göran på?")
            this.maxInput = max
            this.gaming = true
            this.menu = false
            this.goransNumber = this.getRndInteger(1, max)
        },

        controll(guess) {
            if (this.goransNumber === guess) {
                if (this.guesses != 1) {
                    this.setResponseText("Rätt! Det tog bara " + this.guesses + " gissningar!")
                } else {
                    this.setResponseText("Rätt! PÅ FÖRSTA FÖRSÖKET!")
                }
                this.guessButton = false
                this.menu = true
            } else if (this.goransNumber < guess) {
                this.setResponseText("Görans tal är lite mindre...")
            } else if (this.goransNumber > guess) {
                this.setResponseText("Görans tal är lite större...")
            }
        },

        guessing() {
            var guess = Number(this.guessInputValue)
            this.guesses += 1;
            this.responseText ="Göran funderar..."
            setTimeout(() => {
                this.controll(guess)
            }, this.getRndInteger(300, 3000))
            console.log("Gissningar", this.guesses)
        },

        setResponseText(responseText) {
            this.responseText =  responseText;
        },

        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
    }
});
