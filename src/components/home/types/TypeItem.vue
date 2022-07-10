<template>
   <div class="type-item">
        <img :src="require('@/assets/img/pushups/' + img)" alt="">
        <h2>{{ name }}</h2>
    </div>
</template>

<script>
export default {
    props:{
        img: {
            type: String,
            default: 'wide.png'
        },
        name: {
            type: String,
            default: 'Type'
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';
.type-item{
    height: 110px;
    display: flex;
    color: white;
    align-items: center;
    padding:0 .8rem; 
    margin-bottom: 1rem;
    background: rgba(31, 27, 27, 0.4);;
    border-radius: $radius;
    img{
        width: 110px;
    }
    h2{
        margin-left: .8rem;
    }

}

</style>