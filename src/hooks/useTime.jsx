export const useTime = () => {
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  return {
    today: {
      short: today.toLocaleDateString("ru-RU", {
        month: "long",
        day: "numeric",
      }),
      full: today,
    },
    tomorrow: {
      short: tomorrow.toLocaleDateString("ru-RU", {
        month: "long",
        day: "numeric",
      }),
      full: tomorrow,
    },
  };
};
