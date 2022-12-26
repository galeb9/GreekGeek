<template>
  <HomeSection :title="title">
    <PopupHeading 
        color="rgba(0,0,0, 0.6)"
        :text="heading"
    />
    <div class="scoreboard">
        <ul class="scoreboard__list">
            <li v-if="displayTableHead">
                <div class="scoreboard__item first--item">
                    <div class="row">
                        <p class="scoreboard__item__place">#</p>
                        <p class="scoreboard__item__name">NAME</p>
                    </div>
                 
                    <p class="scoreboard__item__num">NUM.</p>
                </div>
            </li>

            <li v-for="(el, index) in data" :key="index">
                <div :class="['scoreboard__item', { 'first' : index === 0 }, { 'second' : index === 1 }, { 'third' : index === 2 },{ 'you' : el.name == this.myUsername } ]">
                    <div class="row">
                        <p class="scoreboard__item__place">{{index + 1}}</p>
                        <p class="scoreboard__item__name">{{ el.name === this.myUsername ? "You" : capitalize(el.name) }}</p>
                    </div>
                    <p class="scoreboard__item__num">{{ el.pushups }}</p>
                </div>
            </li>
        </ul>
    </div>
  </HomeSection>
</template>

<script>
import PopupHeading from '@/components/arena/popup/PopupHeading.vue'

export default {
    components: {
        PopupHeading
    },
    props: {
        data: { type: Array, default: () => [] },
        title: { type: String, default: "" },
        heading: { type: String, default: "" },
        displayTableHead: { type: Boolean, default: true}
    },
    data(){
        return{
            list: []
        }
    },
    methods: {
        capitalize(str){
            let first = str.charAt(0)
            let upper = first.toUpperCase()
            let rest = str.slice(1)
            return upper + rest
        }
    },
    computed: {
        myUsername(){
            return this.$store.getters.myUsername
        },
    }
}
</script>

<style lang="scss">


    .scoreboard{
        padding-bottom: 20px;
        min-width: 220px;
        .scoreboard__list{

            .first{
                background: $gold ;
                background: rgba($gold, 0.77) ;

            }
            .second{
                background: $silver;
            }
            .third{
                background: rgba($bronze, 0.45);
            }
            .you{
                color: red !important;
            }
            .scoreboard__item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem ;
                margin: 1.3rem 0;
                border-radius: $main-radius;
                .row{
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .scoreboard__item__place{
                    color: black;
                }
                .scoreboard__item__num, 
                .scoreboard__item__name{
                    min-width: 20%;
                    max-width: 50%;
                    text-align: center;
                    overflow-x: hidden;
                    font-weight: 700;
                    color: black;

                }
                .scoreboard__item__name{
                    font-size: 1.2rem;
                    max-width: 50vw;
                    font-weight: 600;

                }
            }
            .first--item{
                border-bottom: 1px solid rgba( var(--complementary), 0.3);
                margin-bottom: .3rem;
                background: transparent;
                border-radius: 0;
                padding-top: 0;
                margin-top: 1rem;
                .scoreboard__item__name{
                    font-size: 1rem;
                    font-weight: 400;
                }
                .scoreboard__item__num{
                    font-weight: 400;
                }

            }
        }
    }
</style>