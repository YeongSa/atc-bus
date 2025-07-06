export const useTime = () => {
  const today = new Date();

  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const td = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();

  const tm = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate()
  ).getTime();

  const shortDate = (date) => {
    return new Date(date).toLocaleDateString("ru-Ru", {
      month: "long",
      day: "numeric",
    });
  };

  return {
    today: td,
    tomorrow: tm,
    shortDate,
  };
};
