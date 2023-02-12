export const checkUserInfo = () => {
  const userInfo = localStorage.getItem("userInfo")

  return JSON.parse(userInfo)
}

export const getLoggedInUser = () => {
  return checkUserInfo()['accountId']
}