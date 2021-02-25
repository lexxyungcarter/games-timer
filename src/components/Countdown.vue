<template>
	<div>
		<div v-if="hasStarted" class="countdown">

      <div :key="turn">
        <countdown 
          v-if="playerName"
          :time="clock" 
          @progress="handleCountdownProgress"
        >
          <template slot-scope="props">
            <div class="clock">{{ props.seconds }}s</div>
            <!-- Time Remaining：{{ props.minutes }} minutes, {{ props.seconds }} seconds. -->
          </template>
        </countdown>
      </div>

			<div class="turn" v-if="playerName">{{ playerName }} is playing...</div>
			<div v-else class="select-player">SELECT PLAYER</div>

      <button v-if="playerName" class="stop-btn" @click="stop">STOP</button>
		</div>

    <div v-else class="toggle">
      <b-button variant="outline-primary" pill block size="lg" @click="start">START</b-button>
    </div>

    <Speech v-if="!hasStarted" text="Let's Play" />
    <Speech v-if="hasStarted && playerName" :text="playerName" />
    <Speech v-if="hasStarted && !playerName" text="Select player" />

	</div>
</template>

<script>
import Speech from "./Speech.vue";
/* eslint-disable */

export default {
  props: {
    duration: {
      type: Number,
      required: true,
    },
    elapse: {
      type: Number,
      required: true,
    },
    playerName: {
      type: String,
      default: null,
    },
    hasStarted: {
      type: Boolean,
      default: false,
    }
  },

  components: {
    Speech,
  },

  data() {
    return {
      turn: 1,
    }
  },

  computed: {
    clock() {
      return this.duration * 1000
    }
  },

  methods: {
    start() {
      this.$emit('start')
    },

    handleCountdownProgress(data) {
      // console.log("seconds", data.seconds, 'totalSeconds', data.totalSeconds);
      let timeRemaining = data.totalSeconds - 1 // remove 1 for the 1s delay in sound

      if(timeRemaining <= this.elapse) {
        if(timeRemaining > 0)
          this.triggerWarningSound();
        else
          this.triggerEndSound();
      }

      if(data.totalSeconds <= 1) {
        setTimeout(() => {
          this.turn++
          this.$emit('switch')
        }, 2000)
      }
    },

    triggerWarningSound() {
      var audio = new Audio('/audio/tick.mp3')
      audio.play()
    },

    triggerEndSound() {
      var audio = new Audio('/audio/ting2.mp3')
      audio.play()
    },

    stop() {
      this.$emit('stop')
    }
  }
}
</script>

<style lang="scss">
.countdown {
  position: relative;

  .clock {
    font-size: 70px;
    position: relative;
  }

  .select-player {
    font-size: 40px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    border-radius: 10px;
    border-width: 1;
    border-style: solid;
  }

  .clock, .select-player {
    color: #ff7575;
    border-color: #ff7575;
  }

  .turn {
    color: #AA20E2;
    font-size: 12px;
    position: absolute;
    top: 80%;
    left: calc(50% - 30px);
  }

  .stop-btn {
    position: absolute;
    color: #ff7575;
    border: 1px solid #ff7575;
    border-radius: 10px;
    padding: 5px;
    top: 2%;
    left: 2%;
    font-size: 13px;
    background: #fff;
  }
  
}

.toggle {
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>