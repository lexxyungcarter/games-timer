<template>
	<div class="setting">
		<b-row>
			<b-col>
				<div class="text">{{ name }}</div>
			</b-col>
			<b-col cols="7">
				<b-input size="sm" v-model="text" :placeholder="placeholder"></b-input>
			</b-col>
		</b-row>
	</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      required: true,
    },
		defaultValue: {
			default: undefined,
		}
  },

	data() {
		return {
			text: '',
		}
	},

	watch: {
		text(v) {
			this.$emit('change', v)
		},
	},

  methods: {
    
  },

	mounted() {
		if(this.defaultValue) {
			this.text = this.defaultValue
		}
	}
};
</script>

<style lang="scss">
.setting {
	padding-top: 5px;
	padding-bottom: 5px;

	.text {
		font-size: 11px;
		font-family: "Roboto";
	}
}
</style>