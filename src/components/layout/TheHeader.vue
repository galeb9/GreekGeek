<template>
    <div class="header-container">
        <div class="bg-blur"></div>
        <nav>
            <BaseIconLink 
                class='header__link'
                v-for="(el, index) in routes"
                :key="index"
                :url="el.url"
                :icon="el.icon"
            />
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return {
            routes: [
                { 
                    url: 'home', 
                    icon: ['fa', 'house'],
                },
                { 
                    url: 'goal', 
                    icon: ['fa', 'bullseye'],
                },  
                { 
                    url: 'add', 
                    icon: ['fa', 'fire-flame-curved'],
                },
                { 
                    url: 'stats', 
                    icon: ['fa', 'chart-pie'],
                },
            ]
        }
    },
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables.scss';

    .header-container{
        width: 100%;
        display: flex;
        justify-content: center;
        position: fixed;
        z-index: 1;
        bottom: -2vh;
        left: 0;
        .bg-blur{
            position: absolute;
            background: rgba(86, 69, 121, 0.281);
            backdrop-filter: blur(10px);
            border-radius: 20px 20px 0px 0px;
            width: 100%;
            height: 100%;            
        }
        nav{
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: space-around;
              .header__link{
                -webkit-tap-highlight-color: transparent; 
                position: relative;
                width: 100%;
                height: 100%;
                padding: 2em ;
                text-align: center;
                flex-grow: 1;
                transition: all .5s ease-in-out;
                .fa-icon{
                    transform: scale(1.5);
                }
                &.router-link-active{
                    -webkit-tap-highlight-color: transparent; 
                    &>.fa-icon{
                        color: black;

                    }
                    // &::after{
                    // content: '';
                    // width: 10px;
                    // height: 10px;
                    // border-radius: 50%;
                    // background: black;
                    // position: absolute;
                    // bottom: 14px;
                    // left: 47%;
                    // }
                }
              
            }
        }
    }
</style>