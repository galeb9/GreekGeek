export const formatLocalDate = {
  methods: {
    formatLocalDate(date) {
      return String(date).split(" ").splice(1, 3).join("-");
    },
  },
};
