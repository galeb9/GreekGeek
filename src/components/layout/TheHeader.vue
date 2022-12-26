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
                    url: 'friends', 
                    icon: ['fa', 'magnifying-glass'],
                },  
                { 
                    url: 'profile', 
                    icon: ['fa', 'user'],
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
        z-index: 5;
        bottom: -2vh;
        left: 0;
        .bg-blur{
            position: absolute;
            background: rgba($bg, .4);
            border-top: 3px solid var(--complementary);
            backdrop-filter: blur(3px);
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
                display: flex;
                justify-content: center;
                align-items: center;
                padding-bottom: 10px;
                transition: all .5s ease-in-out;
                color: var(--complementary);
                font-size: 22px;
                flex: 1;
                &.router-link-active{
                    -webkit-tap-highlight-color: transparent; 
                    &>.fa-icon{
                        border-bottom: 2px solid var(--complementary);
                        padding-bottom: 10px;
                    }
                    .profile-notification__alert{
                        display: none;
                    }
                }
              
            }
        }
    }
</style>