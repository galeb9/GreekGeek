<template>
    <div class="base-product-slider">
        <p class="base-product-slider__current-choice">{{ ourTabs[currentItem].tab }}</p>
        <div class="filters">
            <div 
                v-for="(item, index) in tabs" 
                :key="index"
                class="filter__item-container"
                @click="changeData(item.data, index)"
            >
                <div v-if="item.hasData && checkForData" :class="['filter__item', { active: currentData === item.data }]">
                    <!-- <BaseSvg class="filter__item__icon" :icon="item.icon" /> -->
                    <p>{{ item.title }}</p>
                </div>
                <div v-else :class="['filter__item', { active: currentData === item.data }]">
                    <!-- <BaseSvg class="filter__item__icon" :icon="item.icon" /> -->
                    <p>{{ item.title }}</p>
                </div>
            </div>
        </div>
        <transition name="fade-in" mode="out-in">
            <component class="active-tab" @open-product-item="openProductItem" :data="currentData" :is="item"></component>
        </transition>

        <!-- <transition name="move-from-bottom" >
            <BaseDrawer v-if="productVisible" @top-bar-close="closeProductItem">
                <ActiveProduct :data="activeProduct" @close="closeProductItem" />
            </BaseDrawer>
        </transition>
        <transition name="fade-in">
            <BaseOverlay v-if="productVisible"  @close="closeProductItem" />
        </transition> -->
    </div>
</template>

<script>
// import ProductsList from '@/components/products/ProductsList.vue'
// import ActiveProduct from '@/components/products/ActiveProduct.vue'

export default {
    name: "ProductSlider",
    components: {
        // ProductsList,
        // ActiveProduct
    },
    props: {
        data: { type: Object, default: () => {} },
        tabs: { type: Array, default: () => [] },
        checkForData: { type: Boolean, default: false}
    },
    data(){
        return{
            item: "ProductsList",
            currentItem: null,
            currentData: null,
            ourTabs: null,
            productVisible: false,
            activeProduct: null
        }
    },
    methods: {
        openProductItem(item) {
            this.productVisible = true
            this.activeProduct = item
            document.body.style.overflow = "hidden"
        },
        closeProductItem(value) {
            this.productVisible = value
            document.body.style.overflow = ""
        },
        changeData(data, index) {
            this.currentData = data
            this.currentItem = index
        },
        findData() { // first to have some data in arr is made first ACTIVE
            for(let i = 0; i < this.ourTabs.length; i++) {
                if(this.ourTabs[i].data.length > 0) {
                    this.currentData = this.ourTabs[i].data
                    this.currentItem = i
                    break;
                }
            }
            this.addHasDataProp()
        },
        addHasDataProp() {
            for(let j = 0; j < this.ourTabs.length; j++) {
                const current = this.ourTabs[j]
                if(current.data.length === 0) {
                    current.hasData = false
                } else {
                    current.hasData = true
                }
            }
        }
    },
    created() {
        this.ourTabs = this.tabs
        this.findData() 
    }
}
</script>

<style lang="scss">
    .base-product-slider {
        overflow-x:hidden;
        .base-product-slider__current-choice {
            text-align: center;
            margin-bottom: 1rem;
            // background: $primary;
            background: black;
            // color: $lightText;
            color: white;
            border-radius: 8px;
            padding: 14px 5px;
        }
        .filters {
            display: flex;
            align-items: center;
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 20px;
            margin-bottom: 35px;
            .filter__item {
                // border: 2px solid $primary;
                border: 2px solid black;
                width: max-content;
                padding: 14px;
                border-radius: 8px;
                display: flex;
                justify-content: center;
                align-items: center;
                .filter__item__icon {
                    width: 32px;
                    height: 32px;
                    max-width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }
        .active {
            background: black;
            svg  {
                border: 1px solid black;
                path{
                    fill: white;
                }
            }
        }
    }
</style>