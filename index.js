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
            10: "baby",
            50: "easy",
            100: "normal",
            1000: "hard",
            1000000: "impossible",
        },
        scene: "menu",
        name: "",
        currentScoreboard: "",
    },

    computed: {
        reversedHighscore: function () {
            return this.highscoreArray
            .filter((highscore) => {
                return highscore.difficulty === this.currentScoreboard
            })
            .sort((a, b) => {
                return a.score - b.score  
            }).slice(0,10)
        }
    },

    methods: {

        setCurrentScoreboard(difficulty) {
            this.currentScoreboard = difficulty
        },

        showMenu() {
            this.scene = "menu"
        },

        showGameMenu() {
            this.scene = "gameMenu"
        },

        showScoreboard() {
            this.createScore()
            this.scene = "scoreboard"
        },

        showGaming() {
            this.scene = "gaming"
            this.guessButton = "true"
        },

        showLoading() {
            this.scene = "loading"
        },

        startGame(max) {
            this.showLoading()
            this.guesses = 0
            setTimeout(() => {
                this.showGaming()
                this.setResponseText(`Vilket tal 1-${max} tänker Göran på?`)
                this.maxInput = max
                this.goransNumber = this.getRndInteger(1, max)
            }, (2000))
        },

        createScore() {
            //var calculatedScore = this.maxInput - this.guesses * this.maxInput / 10
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
            this.responseText = "Göran funderar..."
            setTimeout(() => {
                this.controll(guess)
            }, this.getRndInteger(300, 3000))
            console.log("Gissningar", this.guesses)
        },

        setResponseText(responseText) {
            this.responseText = responseText;
        },

        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
    }
});
