export function isSessionExpired(endDate) {
  if (!endDate) return false;

  // Get today's date using the user's local calendar date
  const today = new Date();

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  // Convert the end date into a local calendar date
  const [year, month, day] = endDate.split("-").map(Number);

  const sessionEndDate = new Date(year, month - 1, day);

  return todayDate > sessionEndDate;
}
