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
        loading: false,
        highscoreArray: JSON.parse(localStorage.getItem('highScore') || "[]"),
        difficulties: {
            10: "Bebis",
            50: "Lätt",
            100: "Normal",
            1000: "Svår",
            1000000: "Omöjlig",
        },
        scene: "menu",
        name: "",
    },

    methods: {

        showMenu() {
           this.scene = "menu"
        },

        showLoading() {
            this.scene = "loading"
        },
        showGaming() {
            this.scene = "gaming"
            this.guessButton = "true"
        },

        startGame(max) {
            this.showLoading()
            this.guesses = 0
            setTimeout(() => {
                this.showGaming()
                this.setResponseText(`Vilket tal 1-${max} tänker Göran på?`)
                this.maxInput = max
                this.goransNumber = this.getRndInteger(1, max)
            }, (3000))
        },
        
        createScore() {
            var newHighscore = {
                name: this.name,
                difficulty: this.difficulties[this.maxInput],
                score: this.guesses,
            }
            this.highscoreArray.push(newHighscore)
            localStorage.setItem('highScore', JSON.stringify(this.highscoreArray))
        },

        answeredCorrect() {
            this.guessButton = false
            if (this.guesses != 1) {
                this.setResponseText(`Rätt! Det tog bara ${this.guesses} gissningar!`)
            } else {
                this.setResponseText("Rätt! PÅ FÖRSTA FÖRSÖKET!")
            }
        },

        showScoreboard() {
            this.createScore()
            this.scene = "scoreboard"
        },

        controll(guess) {
            if (this.goransNumber === guess) {
                this.answeredCorrect()
            } else if (this.goransNumber < guess) {
                this.setResponseText(`Görans tal är mindre än ${guess}`)
            } else if (this.goransNumber > guess) {
                this.setResponseText(`Görans tal är större än ${guess}`)
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
