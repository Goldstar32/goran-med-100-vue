var app = new Vue({
    el: '#app',
    data: {
        responseText: "Vad tänker Göran på?",
        maxInput: 1,
        guessInputValue: 1,
        guesses: 0,
        goransNumber: null,
        guessButton: true,
        highscoreArray: [],
        pointsVersion: 2,
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

    mounted() {
        var savedHighscoreVersion = JSON.parse(localStorage.getItem('pointsVersion') || "0")
        if(savedHighscoreVersion !== this.pointsVersion) {
            localStorage.clear()
        } else {
            this.highscoreArray = JSON.parse(localStorage.getItem('highScore') || "[]")
        }
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

        saveHighscore() {
            this.showNewScene('scoreboard')
            this.createScore()
        },

        getScoreboardButtonClass(difficulty) {
           return this.currentScoreboard === difficulty ? 'buttonSelected'  : ''
        },

        setCurrentScoreboard(difficulty) {
            this.currentScoreboard = difficulty
        },

        showNewScene(scene) {
            this.scene = scene
        },

        startGame(max) {
            this.guessButton = true
            this.showNewScene("loading")
            this.guesses = 0
            setTimeout(() => {
                this.showNewScene("gaming")
                this.setResponseText(`Vilket tal 1-${max} tänker Göran på?`)
                this.maxInput = max
                this.goransNumber = this.getRndInteger(1, max)
            }, (2000))
        },

        createScore() {
            var newHighscore = {
                name: this.name,
                difficulty: this.difficulties[this.maxInput],
                score: this.guesses,
            }
            this.highscoreArray.push(newHighscore)
            localStorage.setItem('highScore', JSON.stringify(this.highscoreArray))
            localStorage.setItem('pointsVersion', this.pointsVersion)
            this.setCurrentScoreboard(newHighscore.difficulty)
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
        },

        setResponseText(responseText) {
            this.responseText = responseText;
        },

        getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
    }
});
