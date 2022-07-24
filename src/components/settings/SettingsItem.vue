<template>
    <div 
        @click="toggleDropdown"
        :class="['settings__item', {'dropdownActive' : isVisible}]"
    >
        <div class="settings__item__info">
            <h3>{{ title }}</h3>
            <div class="fa-container">
                <font-awesome-icon class="fa-settings" :icon="['fa', 'angle-down']"/>
            </div>
        </div>
        <transition name="move-in-bottom">
            <div v-if="isVisible" class="settings__item__dropdown">
                <p class="drop-item">{{ dropItem }}</p>
                <slot class="drop-item"></slot>
            </div>
        </transition>
     
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        dropItem: {
            type: String,
            default: ""
        }
    },
    data(){
        return{
        isVisible: false,
        }
    },
    computed: {
      
    },
    methods: {
        toggleDropdown(){
            this.isVisible = !this.isVisible
        },
    },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .settings__item{
        background: transparent;
        padding: 1rem 0;
        margin: 0 auto;
        .settings__item__info{
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid $secondary;
          padding-bottom: .3rem;
          h3,
          .fa-settings{
            margin: 0 5px;
          }
          .fa-container{
            width: 10%;
            // border: 1px solid black;
            text-align: center;
          }
          
        }
        .settings__item__dropdown{
          padding-top: 1rem;
          .drop-item{
            letter-spacing: 1px;
            white-space: pre-line;
          }
        }
      }
    .dropdownActive{
        transition: all ease-in-out .2s;
        //background: $secondary;
        //color: white;
        .fa-settings{
          transition: all ease-in-out .2s;
          transform: rotate(180deg);
        }
    }
</style>