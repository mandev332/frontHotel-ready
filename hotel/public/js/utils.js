const backendApi = "http://localhost:5000";

async function request(route, method, body) {
  let headers = {
    token: window.localStorage.getItem("token"),
    "Content-Type": "application/json",
  };
  let response = await fetch(backendApi + route, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!(response.status === 200 || response.status === 201)) {
    response = await response.json();
    throw new Error(response.message);
  }
  return await response.json();
}

function createElements(...array) {
  return array.map((el) => document.createElement(el));
}
