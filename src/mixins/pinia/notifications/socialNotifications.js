import { useNotificationsStore } from "@/scripts/stores/parent-pinia";
import { mapActions, mapState } from "pinia";

export const notificationsAction = {
  methods: {
    ...mapActions(useNotificationsStore, ["profileNotificationsCheck"]),
  },
};

export const notificationsState = {
  computed: {
    ...mapState(useNotificationsStore, ["hasNotifications"]),
  },
};
