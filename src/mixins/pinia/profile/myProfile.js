import { useMyProfileStore } from "@/scripts/stores/parent-pinia";
import { mapActions, mapState } from "pinia";

export const myProfileAction = {
  methods: {
    ...mapActions(useMyProfileStore, ["getMyFriendsCount"]),
  },
};

export const myProfileState = {
  computed: {
    ...mapState(useMyProfileStore, ["myFriendsCount"]),
  },
};
