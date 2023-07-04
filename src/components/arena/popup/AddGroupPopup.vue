<template>
  <div class="add-group-popup">
    <PopupHead heading="Add new Arena" />
    <div class="popup-main">
      <GroupItem
        :img="selectedImg"
        :name="arenaName === '' ? 'Group name' : arenaName"
        :memebers="addedFriends"
      />

      <GroupInput
        icon="arena"
        placeholder="Arena name goes here..."
        v-model="arenaName"
      />

      <PhotoChoice @is-selected="getSelectedImg" />

      <div class="memebers-added">
        <PopupHeading class="popup__heading--special" text="Added so far">
          <span class="added-count"
            >{{ addedFriends.length }} / {{ friends.length }}</span
          >
        </PopupHeading>
        <p class="memebers-added__list" v-if="addedFriends.length > 0">
          {{ addedFriends.join(", ") }}
        </p>
      </div>

      <GroupInput
        icon="loupe"
        placeholder="Search for new members"
        v-model="memeberSearch"
      />

      <PopupHeading
        text="Search friends"
        top-margin="1.5rem"
        bottom-margin="1.5rem"
      />

      <div class="memebers-list">
        <MemberItem
          v-for="(el, index) in searchForUser"
          :key="index + el.name"
          :name="el.name"
          :img="getImgUrl(el.img)"
          :is-member="el.isMemeber"
          @is-selected="changeArray(_, this.addedFriends, el.name)"
        />
      </div>

      <div class="popup__btns">
        <BaseButton
          text="Add Arena"
          class="add-arena-popup__btn"
          :shadow="false"
          align=""
          @click="createNewArena"
        />
        <BaseButton
          text="cancel"
          kind="close"
          align=""
          @click="$emit('closePopup')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PopupHead from "./PopupHead.vue";
import GroupInput from "./GroupInput.vue";
import PhotoChoice from "./photo/PhotoChoice.vue";
import GroupItem from "../group/GroupItem.vue";
import PopupHeading from "./PopupHeading.vue";
import MemberItem from "./MemberItem.vue";
import { db, auth } from "@/scripts/firebaseInit.js";
import { getUserDataState } from "@/mixins/pinia/main/getUserData";

export default {
  name: "AddGroupPopup",
  mixins: [getUserDataState],
  components: {
    PopupHead,
    GroupInput,
    PhotoChoice,
    PopupHeading,
    MemberItem,
    GroupItem,
  },
  data() {
    return {
      arenaName: "",
      memeberSearch: "",
      addedFriends: [],
      members: [],
      friends: [],
      selectedImg: "group01.png",
      fejkFriends: ["greekGeek", "ribon430", "sinjikit131"],
    };
  },

  methods: {
    getImgUrl(pic) {
      return require("@/assets/img/avatars/" + pic);
    },
    removeFromArray(arr, el) {
      var index = arr.indexOf(el);
      if (index !== -1) {
        arr.splice(index, 1);
      }
    },
    getSelectedImg(img) {
      this.selectedImg = img;
    },
    changeArray(selected, arr, name) {
      const notInArr = arr.every((el) => el !== name); // true if current name is not yet in added friends

      if (selected && notInArr) {
        arr.push(name);
      } else {
        this.removeFromArray(arr, name);
      }
    },
    getFriends() {
      // get your friends //should put this in vuex and use in many places
      db.collection("users")
        .doc(auth.currentUser.uid)
        .collection("friends")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.friends.push({
              name: doc.data().username,
              img: doc.data().profileImage,
              isMemeber: false,
              id: doc.data().friendID,
            });
          });
        });
    },
    sendArenaRequest() {
      //gets members + their IDs
      for (let i = 0; i < this.fejkFriends.length; i++) {
        for (let j = 0; j < this.friends.length; j++) {
          if (this.fejkFriends[i] === this.friends[j].name) {
            this.members.push(this.friends[j]);
          }
        }
      }

      for (let i = 0; i < this.members.length; i++) {
        db.collection("users")
          .doc(this.members[i].id)
          .collection("arena-requests")
          .doc(this.arenaName)
          .set({
            img: this.selectedImg,
            name: this.arenaName,
            memebers: this.addedFriends,
            admin: this.username,
            joined: false,
          });
      }
    },
    createNewArena() {
      if (this.arenaName !== "" && this.addedFriends.length > 0) {
        this.addedFriends.push(this.username);
        const newArena = {
          img: this.selectedImg,
          name: this.arenaName,
          memebers: this.addedFriends,
          admin: this.username,
        };

        db.collection("users")
          .doc(auth.currentUser.uid)
          .collection("arenas")
          .doc(this.arenaName)
          .set(newArena);

        this.sendArenaRequest();

        this.$emit("closePopup", newArena);
      } else {
        alert("Some of the required info is empty, please fill in...");
      }
    },
  },
  computed: {
    // switched memebers arr for friends arr
    searchForUser() {
      for (let i = 0; i < this.friends.length; i++) {
        for (let j = 0; j < this.addedFriends.length; j++) {
          if (this.friends[i].name === this.addedFriends[j]) {
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.friends[i].isMemeber = true; // some wierd quickfix maybe not good? uppper comment stoped eslint??
          }
        }
      }
      return this.friends.filter(
        (user) =>
          user.name.toLowerCase().indexOf(this.memeberSearch.toLowerCase()) !=
          -1
      );
    },
  },
  created() {
    this.getFriends();
    // setTimeout(() => {
    //  this.sendArenaRequest()
    // }, 1000);
  },
};
</script>

<style lang="scss">
.add-group-popup {
  max-height: 102vh;
  background: rgba(126, 164, 220, 0.27);
  -webkit-backdrop-filter: blur(25px);
  backdrop-filter: blur(25px);
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  right: 0;
  color: white;
  .parent {
    padding: 20px;
    width: 100px;
    height: 100px;
    background: purple;
  }
  .parent .child2 {
    color: yellow;
  }
  .parent .child1 {
    color: black;
  }
  .popup-main {
    max-height: 89vh;
    height: 100%;
    overflow-y: scroll;
    padding: 0.8rem 1.8rem;
    padding-bottom: 3rem;
    .memebers-added {
      background: black;
      margin: 1rem 0;
      padding: 1rem;
      border-radius: $main-radius;
      .popup__heading--special {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .added-count {
          font-weight: 400;
          letter-spacing: 2px;
          font-size: 16px !important;
        }
      }
      .memebers-added__list {
        margin-top: 0.5rem;
      }
    }
    .memebers-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-bottom: 40px; // to have space bellow
    }
    .add-arena-popup__btn .base-button {
      border-radius: $main-radius;
    }
    .popup__btns {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }
  }
}
// @media only screen and (max-width: 350px) {

// }
</style>
