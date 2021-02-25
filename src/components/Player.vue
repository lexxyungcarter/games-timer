<template>
	<div>
		<div class="player-box" @click="handleClick">
			<div class="player-name">{{ name }}</div>
			<div class="player-tag">Player {{ position }}</div>

      <img src="/img/pad2.png" alt="pad" class="pad">
		</div>
	</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.$emit("click", this.position);
    },
  },
};
</script>

<style lang="scss">
.player-box {
  background-color: #9b59b6;
  border-radius: 20px;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;
  border: 1px solid #9b59b6;
  position: relative;

  .player-name {
    color: #fff;
    text-align: center;
    font-size: 60px;
    font-family: "Roboto";
  }

  .player-tag {
    color: yellow;
    text-align: right;
  }

  .pad {
    position: absolute;
    top: 15%;
    left: calc(50% - 100px);
    max-width: 50%;
    height: auto;
  }
}
</style>