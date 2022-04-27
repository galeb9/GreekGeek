<template>
  <HomeSection title="daily scoreboard">
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
                v-for="(el, index) in list"
                :key="index"
            >
                <div class="scoreboard__item">
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
import { db } from '@/components/firebaseInit.js';

export default {
    data(){
        return{
            list: []
        }
    },
    methods: {
        getUsers(){
            db.collection("users").orderBy("pushupsToday","desc")
            .limit(5)
            .get()
            .then((querySnapshot) => { // still have to sort ???
                querySnapshot.forEach((user) => {
                    // console.log(user.data().username)
                    this.list.push({
                        name: user.data().username,
                        pushups: user.data().pushupsToday
                    })
                });
            });
        },
    },
    created(){
        this.getUsers();
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .scoreboard{
        padding-bottom: 20px;
        min-width: 220px;
        .scoreboard__list{
            .scoreboard__item{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: .3rem;
                margin: 1rem 0;
                .row{
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .scoreboard__item__num, 
                .scoreboard__item__name{
                    min-width: 20%;
                    max-width: 50%;
                    text-align: center;
                    overflow-x: hidden;
                    font-weight: 700;

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