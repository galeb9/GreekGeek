<template>
  <HomeSection :title="title">
    <div class="scoreboard">
        <ul class="scoreboard__list">
            <li>
                <div class="scoreboard__item first--item">
                    <div class="row">
                        <p class="scoreboard__item__place">#</p>
                        <p class="scoreboard__item__name">NAME</p>
                    </div>
                 
                    <p class="scoreboard__item__num">NUM.</p>
                </div>
            </li>

            <li 
                v-for="(el, index) in data"
                :key="index"
            >
                <div :class="['scoreboard__item', { 'first' : index === 0 }, { 'second' : index === 1 }, { 'third' : index === 2 }, ]">
                    <div class="row">
                        <p class="scoreboard__item__place">{{index + 1}}</p>
                        <p class="scoreboard__item__name">{{ el.name }}</p>
                    </div>
                    <p class="scoreboard__item__num">{{ el.pushups }}</p>
                </div>
            </li>
        </ul>
    </div>
  </HomeSection>
</template>

<script>

export default {
    props: {
        data: { type: Array, default: () => [] },
        title: { type: String, default: "" }
    },
    data(){
        return{
            list: []
        }
    },
    computed: {
        // placement() {
            // return  index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : '' 
        // }

    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .scoreboard{
        padding-bottom: 20px;
        min-width: 220px;
        .scoreboard__list{

            .first{
                // background: rgba(gold, .7);
                // background: #C89C18;
                background: rgba(200, 156, 24, 0.77);
            }
            .second{
                // background: rgba(silver, .7);
                background: #D3D3D3;
            }
            .third{
                background: rgba(189, 131, 74, 0.45);
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
                border-bottom: 1px solid rgba( $secondary, 0.3);
                margin-bottom: .3rem;
                background: transparent;
                border-radius: 0;
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