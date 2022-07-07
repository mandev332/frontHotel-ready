(async function () {
  let check = await request(`/login`);
  if (check.status == 401) window.location = "/login";
})();

let filter = document.querySelector(".filter");
let list = document.querySelector(".list");
let modal = document.querySelector(".mod");
let btnC = document.querySelector(".btnC");
let btnW = document.querySelector(".btnW");
let btnR = document.querySelector(".btnR");
let minmodal1 = document.querySelector(".min_mod1");
let minmodal2 = document.querySelector(".min_mod2");
let minmodal3 = document.querySelector(".min_mod3");
let list_title = document.querySelector(".list_title");
const check = document.querySelector(".check");
let pagination = document.querySelector(".pagination");
const menu = document.querySelectorAll(".sidebar__item");

addcustomer.addEventListener("click", () => {
  modal.style.display = "block";
  minmodal1.style.display = "block";
});
addworker.addEventListener("click", () => {
  modal.style.display = "block";
  minmodal2.style.display = "block";
});
addroom.addEventListener("click", () => {
  modal.style.display = "block";
  minmodal3.style.display = "block";
});

save1.onclick = async (e) => {
  e.preventDefault();

  firstname = document.querySelector("#firstname");
  lastname = document.querySelector("#lastname");
  passport = document.querySelector("#passport");
  roomnumber = document.querySelector("#roomnumber");
  contact = document.querySelector("#contact");
  sel = document.querySelector("#sel");

  if (
    !firstname.value ||
    !lastname.value ||
    !passport.value ||
    !roomnumber.value ||
    !contact.value
  )
    return alert("You must enter all your info");
  let customer = {
    firstName: firstname.value,
    lastName: lastname.value,
    passportinfo: passport.value,
    gender: +sel.value,
    roomNumber: +roomnumber.value,
    contact: contact.value,
    leftDate: dedline.value,
  };
  let response = await request("/customers", "POST", customer);
  if ((await response.status) == 200) {
    pushcustomers();
    firstname.value = "";
    lastname.value = "";
    passport.value = "";
    roomnumber.value = "";
    contact.value = "";
    minmodal1.style.display = "none";
    modal.style.display = "none";
  } else alert(response.massage);
};
save2.onclick = async (e) => {
  e.preventDefault();
  firstname = document.querySelector("#firstnamew");
  lastname = document.querySelector("#lastnamew");
  passport = document.querySelector("#passportw");
  workname = document.querySelector("#workname");
  contact = document.querySelector("#contactw");
  selgender = document.querySelector("#selectgender");
  birthdate = document.querySelector("#birthdate");

  if (
    !firstname.value ||
    !lastname.value ||
    !passport.value ||
    !workname.value ||
    !contact.value ||
    !selgender.value ||
    !birthdate.value
  )
    return alert("You must enter all your info");
  let worker = {
    firstName: firstname.value,
    lastName: lastname.value,
    passportinfo: passport.value,
    workName: workname.value,
    contact: contact.value,
    gender: +selgender.value,
    birthDate: birthdate.value,
  };
  let response = await request("/workers", "POST", worker);
  if ((await response.status) == 200) {
    pushworkers();
    firstname.value = "";
    lastname.value = "";
    passport.value = "";
    workname.value = "";
    contact.value = "";
    birthdate.value = "";
    minmodal2.style.display = "none";
    modal.style.display = "none";
  } else alert(response.massage);
};
save3.onclick = async (e) => {
  e.preventDefault();
  roomnumber = document.querySelector("#roomnumberr");
  roomtype = document.querySelector("#selectroomtype");
  bed = document.querySelector("#selectbed");
  tv = document.querySelector("#selecttv");
  cond = document.querySelector("#selectcond");
  other = document.querySelector("#other");
  price = document.querySelector("#price");
  if (!roomnumber.value || !bed.value || !price.value)
    return alert("You must enter all your info");
  let newroom = {
    roomNumber: +roomnumber.value,
    roomType: +roomtype.value,
    bed: +bed.value,
    television: +tv.value,
    conditioner: +cond.value,
    other: other.value,
    price: +price.value,
  };
  let response = await request("/rooms", "POST", newroom);
  if ((await response.status) == 200) {
    renderroom((await request(`/rooms?busy=0&page=1&limit=7`)).data);
    roomnumber.value = "";
    bed.value = "";
    price.value = "";
    minmodal3.style.display = "none";
    modal.style.display = "none";
  } else alert(response.status);
};
btnC.onclick = async (e) => {
  e.preventDefault();
  minmodal1.style.display = "none";
  modal.style.display = "none";
};
btnW.onclick = async (e) => {
  e.preventDefault();
  minmodal2.style.display = "none";
  modal.style.display = "none";
};
btnR.onclick = async (e) => {
  e.preventDefault();
  minmodal3.style.display = "none";
  modal.style.display = "none";
};

for (let i of menu) {
  try {
    i.onclick = async (e) => {
      e.preventDefault();
      menu.forEach((ee) => {
        if (ee == i) {
          ee.className = "active";
        } else ee.className = "passive";
      });
      list.innerHTML = "";
      if (i.textContent.trim() == "Customers") pushcustomers();
      if (i.textContent.trim() == "Workers") pushworkers();
      if (i.textContent.trim() == "Rooms") pushrooms();
    };
  } catch (err) {}
}

function rendercustomer(arr) {
  list_title.innerHTML = `<ul class="list_title">
                              <li scope="">Photo user</li>
                              <li scope="">First name</li>
                              <li scope="">Last name</li>
                              <li scope="">Room</li>
                              <li scope="">Contact</li>
                              <li scope="">Come date</li>
                              <li scope="">Left date</li>
                            </ul>`;
  list.innerHTML = "";
  arr?.map((e) => {
    let [li, avatar, first, last, room, contact, come, left, edit, delet] =
      createElements(
        "li",
        "span",
        "span",
        "span",
        "span",
        "span",
        "span",
        "span",
        "button",
        "button"
      );
    e.gender == 1
      ? (avatar.innerHTML = `<img class="img__td" src="/img/man.png" alt="" />`)
      : (avatar.innerHTML = `<img class="img__td" src="/img/woman.png" alt="" />`);
    contact.innerHTML = `<img width="20" src="/img/call.png" alt="" />`;
    edit.innerHTML = `<i class='bx bx-edit-alt'></i>`;
    delet.innerHTML = `<i class='bx bx-message-square-x'></i>`;
    delet.style = "width: 100px; background: none;";
    edit.style = "width: 100px; background: none;";
    delet.id = e._id;
    first.textContent = e.first_name;
    last.textContent = e.last_name;
    room.textContent = e.room_number;
    contact.textContent = "+998" + e.contact;
    come.textContent = e.come_date.split("T")[0];
    left.textContent = e.left_date ? e.left_date.split("T")[0] : "_____";
    edit.onclick = (e) => {
      e.preventDefault();
      console.log(li);
    };
    delet.onclick = async (even) => {
      even.preventDefault();
      let re = await request(`/customers/` + delet.id, "DELETE");
      rendercustomer(
        (await request(`/customers?left=${+!check.checked}&page=1&limit=7`))
          .data
      );
    };
    li.append(avatar, first, last, room, contact, come, left, edit, delet);
    li.className = "li_user";
    list.append(li);
  });
}

function renderworker(arr) {
  list_title.innerHTML = `<ul class="list_title">
                              <li scope="">Photo user</li>
                              <li scope="">First name</li>
                              <li scope="">Last name</li>
                              <li scope="">Room</li>
                              <li scope="">Contact</li>
                              <li scope="">Come date</li>
                              <li scope="">Left date</li>
                            </ul>`;
  list.innerHTML = "";
  arr?.map((e) => {
    let [li, avatar, first, last, work, contact, come, left, edit, delet] =
      createElements(
        "li",
        "span",
        "span",
        "span",
        "span",
        "span",
        "span",
        "span",
        "button",
        "button"
      );
    e.gender == 1
      ? (avatar.innerHTML = `<img class="img__td" src="/img/man.png" alt="" />`)
      : (avatar.innerHTML = `<img class="img__td" src="/img/woman.png" alt="" />`);
    contact.innerHTML = `<img width="20" src="/img/call.png" alt="" />`;
    edit.innerHTML = `<i class='bx bx-edit-alt'></i>`;
    delet.innerHTML = `<i class='bx bx-message-square-x'></i>`;
    delet.style = "width: 100px; background: none;";
    edit.style = "width: 100px; background: none;";
    delet.id = e._id;
    first.textContent = e.first_name;
    last.textContent = e.last_name;
    work.textContent = e.work_name;
    contact.textContent = "+998" + e.contact;
    come.textContent = e.begin.split("T")[0];
    left.textContent = e.end ? e.end.split("T")[0] : "_____";
    delet.onclick = async (even) => {
      even.preventDefault();
      let re = await request(`/workers/` + delet.id, "DELETE");
      renderworker(
        (await request(`/workers?end=${+!check.checked}&page=1&limit=7`)).data
      );
    };
    li.append(avatar, first, last, work, contact, come, left, edit, delet);
    li.className = "li_user";
    list.append(li);
  });
}

function renderroom(arr) {
  list.innerHTML = "";
  list_title.innerHTML = "";
  list_title.innerHTML = `<ul class="list_title">
                            <li scope="">Class</li>
                            <li scope="">Number</li>
                            <li scope="">Price</li>
                            <li scope="">Busy</li>
                          </ul>`;
  arr?.map((e) => {
    let [li, clas, roomNumber, price, busy, bad, edit, delet] = createElements(
      "table",
      "li",
      "span",
      "span",
      "span",
      "span",
      "span",
      "button",
      "button"
    );
    clas.className = "clas";
    busy.className = "clas";
    if (e.room_type == 1) {
      clas.textContent = "GOLD";
      clas.style = "  background: gold;";
    } else if (e.room_type == 2) {
      clas.textContent = "SILVER";
      clas.style = "  background: silver;";
    } else if (e.room_type == 3) {
      clas.textContent = "BRONSE";
      clas.style = "  background:  rgb(228, 154, 69);";
    }
    edit.innerHTML = `<i class='bx bx-edit-alt'></i>`;
    delet.innerHTML = `<i class='bx bx-message-square-x'></i>`;
    delet.className = "icon";
    delet.id = e._id;
    edit.className = "icon";
    roomNumber.textContent = e.room_number;
    price.textContent = e.price + " $";
    if (+e.busy == 1) {
      busy.style = "background:  rgb(109, 114, 120);";
    }
    bad.textContent = e.bad;
    li.className = "li_user";
    li.style = "";

    delet.onclick = async (even) => {
      even.preventDefault();
      let re = await request(`/rooms/` + delet.id, "DELETE");
      renderroom(
        (await request(`/rooms?busy=${+check.checked}&page=1&limit=7`)).data
      );
    };
    li.append(clas, roomNumber, price, busy, bad, edit, delet);
    list.append(li);
  });
}

async function pushcustomers() {
  {
    let res = await request(`/customers?left=1&page=1&limit=7`);
    rendercustomer(res.data);
    let [search, pasport, number, check, btn_search] = createElements(
      "input",
      "input",
      "input",
      "div",
      "button"
    );
    filter.innerHTML = "";
    search.type = "search";
    search.placeholder = "search";
    pasport.placeholder = "passport";
    number.placeholder = "number";
    check.innerHTML = ` <div class="toggle">
                          <input type="checkbox" class="check" />
                          <b class="b switch"></b>
                          <b class="b track"></b>
                        </div>`;
    btn_search.innerHTML = `<i class="bx bx-search-alt-2"></i>`;
    check.className = "checked";
    btn_search.onclick = async (even) => {
      even.preventDefault();
      let check = document.querySelector(".check");
      let response = await request(
        `/customers?name=${search.value.trim()}&passportInfo=${pasport.value.trim()}&contact=${number.value.trim()}&left=${+!check.checked}&page=1&limit=7`
      );
      // list.innerHTML = "";
      if (response.data.length) {
        rendercustomer(response.data);
      } else {
        list.innerHTML = `<img width ="400" src="/img/notFound.jpg" alt="" />`;
      }
    };
    filter.append(search, pasport, number, check, btn_search);
    let p = parseInt(res.pagin) + 1;
    pagination.innerHTML = "";
    let page = 1;
    if (p > 2) {
      for (let i = 0; i <= p; i++) {
        let li = document.createElement("button");
        li.className = "pagin";
        if (i == 0) li.textContent = "<";
        else if (i == p) li.textContent = ">";
        else li.textContent = i;
        li.onclick = async (e) => {
          e.preventDefault();
          let pag_check = document.querySelector(".check");
          if (li.textContent == ">" && page < p - 1) {
            console.log(p);
            rendercustomer(
              (
                await request(
                  `/customers?left=${+!pag_check.checked}&page=${(page += 1)}&limit=7`
                )
              ).data
            );
          } else if (li.textContent == "<" && page > 1) {
            rendercustomer(
              (
                await request(
                  `/customers?left=${+!pag_check.checked}&page=${(page -= 1)}&limit=7`
                )
              ).data
            );
          } else if (+li.textContent) {
            rendercustomer(
              (
                await request(
                  `/customers?left=${+!pag_check.checked}&page=${
                    li.textContent
                  }&limit=7`
                )
              ).data
            );
            page = +li.textContent;
          }
        };
        pagination.append(li);
      }
    }
  }
}

async function pushworkers() {
  {
    let res = await request(`/workers?end=1&page=1&limit=7`);
    renderworker(res.data);
    let [search, pasport, number, check, btn_search] = createElements(
      "input",
      "input",
      "input",
      "div",
      "button"
    );
    filter.innerHTML = "";
    search.type = "search";
    search.placeholder = "search";
    pasport.placeholder = "passport";
    number.placeholder = "number";
    check.innerHTML = ` <div class="toggle">
  <input type="checkbox" class="check" />
  <b class="b switch"></b>
  <b class="b track"></b>
  </div>`;
    btn_search.innerHTML = `<i class="bx bx-search-alt-2"></i>`;
    check.className = "checked";
    btn_search.onclick = async (even) => {
      even.preventDefault();
      let check = document.querySelector(".check");
      let response = await request(
        `/workers?name=${search.value.trim()}&passportInfo=${pasport.value.trim()}&contact=${number.value.trim()}&end=${+!check.checked}&page=1&limit=7`
      );
      // list.innerHTML = "";
      if (response.data.length) {
        renderworker(response.data);
      } else {
        list.innerHTML = `<img width ="400" src="/img/notFound.jpg" alt="" />`;
      }
    };
    filter.append(search, pasport, number, check, btn_search);
    let p = parseInt(res.pagin) + 1;
    pagination.innerHTML = "";
    let page = 1;
    if (p > 2) {
      for (let i = 0; i <= p; i++) {
        let li = document.createElement("button");
        li.className = "pagin";
        if (i == 0) li.textContent = "<";
        else if (i == p) li.textContent = ">";
        else li.textContent = i;
        li.onclick = async (e) => {
          e.preventDefault();
          let pag_check = document.querySelector(".check");
          if (li.textContent == ">" && page < p - 1) {
            renderworker(
              (
                await request(
                  `/workers?end=${+!pag_check.checked}&page=${(page += 1)}&limit=7`
                )
              ).data
            );
          }
          if (li.textContent == "<" && page > 1) {
            renderworker(
              (
                await request(
                  `/workers?end=${+!pag_check.checked}&page=${(page -= 1)}&limit=7`
                )
              ).data
            );
          } else if (+li.textContent) {
            renderworker(
              (
                await request(
                  `/workers?end=${+!pag_check.checked}&page=${
                    li.textContent
                  }&limit=7`
                )
              ).data
            );
            page = +li.textContent;
          }
        };
        pagination.append(li);
      }
    }
  }
}

async function pushrooms() {
  {
    let res = await request(`/rooms?busy=1&page=1&limit=7`);
    renderroom(res.data);
    let [br, bd, number, check, btn_search] = createElements(
      "span",
      "span",
      "input",
      "div",
      "button"
    );
    filter.innerHTML = "";
    br.style = "width: 402px; background: none;";
    bd.style = "background: none;";
    number.type = "search";
    number.placeholder = "number";
    check.innerHTML = ` <div class="toggle">
    <input type="checkbox" class="check" />
    <b class="b switch"></b>
    <b class="b track"></b>
    </div>`;
    btn_search.innerHTML = `<i class="bx bx-search-alt-2"></i>`;
    check.className = "checked";
    btn_search.onclick = async (even) => {
      even.preventDefault();
      let check = document.querySelector(".check");
      let response = await request(
        `/rooms?roomNumber=${number.value.trim()}&busy=${+!check.checked}&page=1&limit=7`
      );
      // list.innerHTML = "";
      if (response.data.length) {
        renderroom(response.data);
      } else {
        list.innerHTML = `<img width ="400" src="/img/notFound.jpg" alt="" />`;
      }
    };
    filter.append(br, bd, number, check, btn_search);
    let p = parseInt(res.pagin) + 1;
    pagination.innerHTML = "";
    let page = 1;
    if (p > 2) {
      for (let i = 0; i <= p; i++) {
        let li = document.createElement("button");
        li.className = "pagin";
        if (i == 0) li.textContent = "<";
        else if (i == p) li.textContent = ">";
        else li.textContent = i;
        li.onclick = async (e) => {
          e.preventDefault();
          let pag_check = document.querySelector(".check");
          if (e.textContent == ">" && page < p - 1) {
            renderroom(
              (
                await request(
                  `/rooms?busy=${+!pag_check.checked}&page=${(page += 1)}&limit=7`
                )
              ).data
            );
          } else if (e.textContent == "<" && page > 1) {
            renderroom(
              (
                await request(
                  `/rooms?busy=${+!pag_check.checked}&page=${(page -= 1)}&limit=7`
                )
              ).data
            );
          } else if (+li.textContent) {
            renderroom(
              (
                await request(
                  `/rooms?busy=${+!pag_check.checked}&page=${
                    li.textContent
                  }&limit=7`
                )
              ).data
            );
            page = +li.textContent;
          }
        };
        pagination.append(li);
      }
    }
  }
}
