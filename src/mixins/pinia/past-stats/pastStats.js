import { usePastStatsStore } from "@/scripts/stores/parent-pinia";
import { mapActions, mapState } from "pinia";

export const pastStatsAction = {
  methods: {
    ...mapActions(usePastStatsStore, ["getPastMonthData", "getMonthDateDoc"]),
  },
};

export const pastStatsState = {
  computed: {
    ...mapState(usePastStatsStore, ["monthsDataObj"]),
  },
};
