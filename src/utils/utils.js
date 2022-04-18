export const getScreenType = (element) => {
  if (element.innerWidth >= 1440) {
    return "deskTop"
  } else return "mobile"
}
