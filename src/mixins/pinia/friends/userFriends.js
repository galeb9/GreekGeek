import { useFriendsStore } from "@/scripts/stores/parent-pinia";
import { mapActions, mapState } from "pinia";

export const userFriendsAction = {
  methods: {
    ...mapActions(useFriendsStore, ["getUsers"]),
  },
};

export const userFriendsState = {
  computed: {
    ...mapState(useFriendsStore, ["allUsers", "sampleUsers"]),
  },
};
