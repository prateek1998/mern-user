export const columns = [
  { id: "sno", label: "SNo", minWidth: 40 },
  { id: "date", label: "Joined Date", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 100 },
  { id: "phone", label: "Phone Number", minWidth: 100 },
  { id: "email", label: "Email", minWidth: 100 },
  { id: "actions", label: "Actions", minWidth: 100 },
];

export const formatDate = (
  value,
  formatting = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  }
) => {
  if (!value) return value;
  return new Intl.DateTimeFormat("en-US", formatting).format(new Date(value));
};
