export const useTime = () => {
  const today = new Date().toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
  });

  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const tomorrowDay = tomorrow.toLocaleDateString("ru-RU", {
    month: "long",
    day: "numeric",
  });

  return { today, tomorrow: tomorrowDay };
};
