(async function () {
  let check = await request(`/login`);
  if (check.status != 401) window.location = "/admin";
})();

btnsign.onclick = async (even) => {
  try {
    even.preventDefault();
    let pass = password.value;
    let log = login.value;
    if (log.length > 15 || log.length < 3)
      return (h3.textContent =
        "Entrance length less than 3 or longer than 15!");
    if (!/[A-Za-z]/.test(log))
      return (h3.textContent = "The entry must consist of letters only!!");
    if (pass.length < 4 || pass.length > 15)
      return (h3.textContent =
        "Password length less than 4 or longer than 15!");
    if (!/[A-Za-z]/.test(pass) || !/[0-9]/.test(pass))
      return (h3.textContent =
        "The password must consist of letters and numbers!");

    let res = await fetch(
      `http://localhost:5000/login?login=${log}&password=${pass}`
    );
    res = await res.json();
    h3.textContent = res.message;
    localStorage.setItem("token", res?.data);
    window.location = "/admin";
  } catch (er) {
    h3.textContent = er.message;
  }
};
