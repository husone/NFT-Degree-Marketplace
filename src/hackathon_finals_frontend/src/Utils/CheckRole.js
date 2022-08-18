const checkRole = principalId => {
  // Do something with backend to receive role of principalId

  // Test
  let role
  if (
    principalId ===
    'ibb2v-rs73g-qsvdc-odxek-reexf-i2z2m-yf3zs-y7yl7-a5v57-bsa27-cae'
  ) {
    role = 'admin'
  } else if (
    principalId ===
    '7ebsx-dcvmn-d2qr4-3bx5d-sv5du-asb77-r6m24-fdahg-6akax-4a4ih-vqe'
  ) {
    role = 'education'
  } else if (
    principalId ===
    'sxcu7-pxnti-gjjpt-ibf4n-orpun-rp3bo-ch26h-4xldd-d3lf5-mqi32-qqe'
  ) {
    role = 'user'
  }
  // switch (principalId) {
  //   case 'ibb2v-rs73g-qsvdc-odxek-reexf-i2z2m-yf3zs-y7yl7-a5v57-bsa27-cae':
  //     role = 'admin'
  //     break
  //   case '7ebsx-dcvmn-d2qr4-3bx5d-sv5du-asb77-r6m24-fdahg-6akax-4a4ih-vqe':
  //     role = 'education'
  //     break
  //   default:
  //     role = 'user'
  //     break
  // }
  return role
}

export { checkRole }
