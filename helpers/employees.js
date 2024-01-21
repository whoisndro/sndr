const calculateTotalSalary = (employees) => {
  return employees.reduce((total, employee) => total + employee.salary, 0)
}

const formatSalaryToRupiah = (salary) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  })

  return formatter.format(salary)
}

const calculateAge = (birthDate) => {
  const today = new Date()
  const dob = new Date(birthDate)
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }

  return age
}

module.exports = {
  calculateTotalSalary,
  formatSalaryToRupiah,
  calculateAge,
}
