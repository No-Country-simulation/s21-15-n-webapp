export const useNameInitials = (name: string) => {
  if (!name) return "UD" // User Default

  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}
