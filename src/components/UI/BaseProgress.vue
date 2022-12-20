<template>
<div class="base-progress">
	<div class="circle" :style="{ width: circleSize + 'px', height: circleSize + 'px', backgroundImage: color}">
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
		circleSize: { type: Number, default: 34},
		count: { type: Number, default: 0},
		bgColor: { type: String, default: "rgb(155, 167, 158)" }, // for slot only
	},
	computed: {
		color() {
			let activeColor = this.progress > 70 ? "33, 208, 122" : (this.progress > 30  ?  "210, 213, 49" : "216, 35, 95")
			return `conic-gradient(rgb(${activeColor}) ${this.progress}%, rgba(${activeColor}, 0.1) 0)`
		}
	},

}
</script>

<style lang="scss">


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