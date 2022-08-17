const checkRole = principalId => {
  // Do something with backend to receive role of principalId

  // Test
  let role
  switch (principalId) {
    case 1:
      role = 'admin'
      break
    case 2:
      role = 'education'
      break
    default:
      role = 'user'
      break
  }
  return role
}

export { checkRole }
