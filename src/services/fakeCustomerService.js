export const customers = [
  {
    _id: "5b21ca3eeb7f6fbccd471818",
    name: "Anand",
    phone: "123456789",
    isGold: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "Anita",
    phone: "123456710",
    isGold: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "Nitin",
    phone: "123456711",
    isGold: false,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "Ashu",
    phone: "123456712",
    isGold: true,
  },
];

export function getCustomers() {
  return customers;
}
export function saveCustomer(customer) {
  let customerInDb = customers.find((c) => c._id === customer._id) || {};
  customerInDb.name = customer.name;
  customerInDb.phone = customer.phone;
  customerInDb.isGold = customer.isGold;

  if (!customerInDb._id) {
    customerInDb._id = Date.now().toString();
    customers.push(customerInDb);
  }

  return customerInDb;
}
export function deleteCustomer(id) {
  let customerInDb = customers.find((c) => c._id === id);
  customers.splice(customers.indexOf(customerInDb), 1);
  return customerInDb;
}
