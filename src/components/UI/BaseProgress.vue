<template>
<div class="base-progress">
	<div class="circle" :style="{ width: size + 'px', height: size + 'px', backgroundImage: color}">
		<div class="inner">
			<slot>
				<div class="inner__container" :style="{ background: bgColor }">
					<div class="inner__number">{{ Math.floor(progress) || "NR" }}</div>
					<div v-if="progress > 0" class="inner__icon">%</div>
				</div>
			</slot>
		</div>
	</div>
</div>
</template>

<script>
export default {
	name: "BaseProgress",
	props: {
		progress: { type: Number, default: 0},
		size: { type: Number, default: 34},
		bgColor: { type: String, default: "rgb(155, 167, 158)" }
	},
	data () {
		return {
			count: 0
		}
	},
	computed: {
		color() {
			let activeColor = this.progress > 70 ? "33, 208, 122" : (this.progress > 30  ?  "210, 213, 49" : "216, 35, 95")
			return `conic-gradient(rgb(${activeColor}) ${this.count}%, rgba(${activeColor}, 0.1) 0)`
		}
	},
	watch: {
		progress () {
			if(this.progress) this.countProgress(Math.floor(this.progress))
		}
	},
	methods: {
		countProgress (end) {
			let counter = setInterval(() => this.count <= end ? this.count++ : clearInterval(counter), Math.floor(1000 / end))
		}
	},
	mounted() {
		if(this.progress) this.countProgress(Math.floor(this.progress))
	}
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.base-progress {
    border: 2px solid $secondary;
	border-radius: 50%;
	padding: 2px;
	.circle {
		position: relative;
		border-radius: 50%;
		background: conic-gradient(rgba(63, 78, 67, 0.1) 0);
		overflow: hidden;
		transition: all .3s ease-out;
		.inner {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 85%;
			height: 85%;
			border-radius: 50%;
			font-weight: 300;
			&__container {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				color: black;
				font-weight: 700;
				.inner__number { font-size: 15px }
				.inner__icon {
					font-size: 7px;
					margin-top: 3px;
				}
			}
		}
	}
}
   
</style>