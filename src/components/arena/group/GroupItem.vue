<template>
    <div 
        class="group-item" 
      >
        <div class="group__image">
          <img :src="getImgUrl(img)" alt="">
        </div>
        <div class="group__text">
          <h3 class="name">{{ name }}</h3>
          <p class="members">{{ members }} members</p>
        </div>
      </div>
</template>

<script>
export default {
    props: {
        img: { type: String, default: "group01.png" },
        name: { type: String, default: "" },
        members: { type: Number, default: 0 }
    },
    methods: {
        getImgUrl(pic) {
            return require('@/assets/img/groups/' + pic)
        },
    }

}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

    .group-item{
      margin-bottom: 1rem;
      padding: 1rem 1.8rem ;
      max-width: 540px;
      min-width: 250px;
      border-radius: 8px;
      background: rgba(17, 16, 16, 0.945);
      background: black;
      color: white;
      display: flex;
      align-items: center;
      gap: 1rem;
      filter: drop-shadow(0px 7px 10px rgba(0, 0, 0, 0.25));
      .group__image{

        img{
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: rgba(white, 0.4) 2px solid;
        }
      }
      .members{
        font-weight: 300;
        color: rgba(white, 0.9);
      }
    }
</style>