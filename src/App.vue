<template>
  <div id="app">
    <Player :name="player1" :position="1" @click="playerClicked" />

    <Setting name="Duration (s):" placeholder="Duration per turn" type="number" :default-value="duration" @change="setDuration" />
    <Setting name="Elapse Alert (s):" placeholder="Elapse time reminder" type="number" :default-value="elapse" @change="setElapse" />

    <Countdown 
      :duration="duration" 
      :elapse="elapse" 
      :player-name="selectedPlayer" 
      :has-started="hasStarted" 
      @start="startGame" 
      @stop="stopGame" 
      @switch="switchPlayer"
    />

    <Setting name="Player 1 Name:" :placeholder="player1" @change="setPlayer1" />
    <Setting name="Player 2 Name:" :placeholder="player2" @change="setPlayer2" />

    <Player :name="player2" :position="2" @click="playerClicked" />

    <Credits />
  </div>
</template>

<script>
import Player from "./components/Player.vue";
import Countdown from "./components/Countdown.vue";
import Setting from "./components/Setting.vue";
import Credits from "./components/Credits.vue";

export default {
  name: "App",
  components: {
    Player,
    Countdown,
    Setting,
    Credits,
  },
  
  data() {
    return {
      player1: 'John',
      player2: 'Jane',
      duration: 10,
      elapse: 5,
      selectedPlayer: null,
      hasStarted: false,
    }
  },

  methods: {
    playerClicked(position) {
      switch(position) {
        case 1:
          this.selectedPlayer = this.player1;
          break;
        case 2:
          this.selectedPlayer = this.player2;
          break;
          default: break;
      }
    },
    setPlayer1(name) {
      this.player1 = name
    },
    setPlayer2(name) {
      this.player2 = name
    },
    setDuration(duration) {
      this.duration = duration
    },
    setElapse(time) {
      this.elapse = time
    },
    startGame() {
      this.hasStarted = true
    },
    stopGame() {
      this.hasStarted = false
      this.selectedPlayer = null;
    },
    switchPlayer() {
      if(this.selectedPlayer == this.player1)
        this.selectedPlayer = this.player2;
      else
        this.selectedPlayer = this.player1;
    }
  },
};
</script>

<style>
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}
</style>
