import { useMainStore } from "@/scripts/stores/parent-pinia";
import { mapActions, mapState } from "pinia";

export const getUserDataAction = {
  methods: {
    ...mapActions(useMainStore, ["getUserData"]),
  },
};

export const getUserDataState = {
  computed: {
    ...mapState(useMainStore, [
      "username",
      "avatarImg",
      "goal",
      "pushupsToday",
      "attempts",
    ]),
    // usage if you want them to change name from name to pName to not overrite existing items
    // ...mapState(useMainStore, {
    //   pName: "name",
    //   pUsername: "username",
    //   pAvatarImg: "avatarImg",
    //   pGoal: "goal",
    //   pPushupsToday: "pushupsToday",
    // }),
  },
};
