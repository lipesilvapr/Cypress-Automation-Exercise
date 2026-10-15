/**
 * Helpers de API para preparar/limpar massa de dados (muito mais rápido e estável que fazer via UI).
 * A API do site responde sempre HTTP 200, com o status real em `responseCode` no corpo,
 * e com Content-Type text/html (o corpo pode chegar como string).
 */
const parse = (body) => (typeof body === 'string' ? JSON.parse(body) : body);

const toApiPayload = (user) => ({
  name: user.name,
  email: user.email,
  password: user.password,
  title: user.title,
  birth_date: user.birthDate,
  birth_month: user.birthMonth,
  birth_year: user.birthYear,
  firstname: user.firstName,
  lastname: user.lastName,
  company: user.company,
  address1: user.address1,
  address2: user.address2,
  country: user.country,
  zipcode: user.zipcode,
  state: user.state,
  city: user.city,
  mobile_number: user.mobileNumber,
});

export function createUserViaApi(user) {
  return cy
    .request({ method: 'POST', url: '/api/createAccount', form: true, body: toApiPayload(user) })
    .then((res) => {
      expect(parse(res.body).responseCode, `createAccount -> ${res.body}`).to.eq(201);
      return user;
    });
}

export function deleteUserViaApi({ email, password }) {
  return cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email, password },
    failOnStatusCode: false,
  });
}
