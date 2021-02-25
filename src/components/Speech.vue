<template>
  <div class="speech">
    <button type="button" @click="speak" ref="speechbtn">Click Me!</button>
    <!-- <b-btn @click="test">Test</b-btn> -->
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: {
    text: {
      type: String,
      default: "Hello",
    },
    isFemaleVoice: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      synthesis: null,
      voices: null,
      voiceSpeaking: false,
      voicePaused: false,
      voiceComplete: false,
      femalePitch: 1.0,
      malePitch: 0.4,
    }
  },

  watch: {
    text(v) {
      if(v) {
        if(this.synthesis) {
          this.$refs.speechbtn.click()
        }
      }
    }
  },

  methods: {
    speak() {
      let textUtterance = new SpeechSynthesisUtterance(this.text);
      textUtterance.text = this.text;    
      textUtterance.lang = 'en-US';
      textUtterance.rate = 1;
      textUtterance.pitch = this.isFemaleVoice ? this.femalePitch : this.malePitch;

      textUtterance.onstart = function () {
        this.voiceComplete = false;
        this.voiceSpeaking = true;
        this.voicePaused = false;
      }

      textUtterance.onend = function (evt) {
        this.voiceComplete = true;
        this.voiceSpeaking = false;
      }

      this.synthesis.speak(textUtterance);
    },

    pause() {
      if(this.voiceSpeaking)
        this.synthesis.pause();

      this.voicePaused = true;
    },

    stop() {
      if(this.voiceSpeaking)
        this.synthesis.cancel();

      this.voiceComplete = true;
    },

    test() {
      var msg = new SpeechSynthesisUtterance('Hello World');
      msg.text = 'Hello World';    
      msg.lang = 'en-US';
      msg.rate = 1;
      msg.pitch = 1;
      window.speechSynthesis.speak(msg);
    }
  },

  mounted() {
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    } else {

      let message = 'Text-to-speech not supported by your browser.';

      console.log(message);

    }
  }
}
</script>

<style>
  .speech {
    display: none;
  }
</style>