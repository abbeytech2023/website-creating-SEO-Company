export const get_initials = (student) => {
  const first_initial = student.first_name?.[0] || "";
  const last_initial = student.last_name?.[0] || "";

  return `${first_initial}${last_initial}`.toUpperCase();
};
