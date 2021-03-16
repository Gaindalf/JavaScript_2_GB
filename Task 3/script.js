class readForm {

    getForm() {
        let button = document.getElementById("button");
        button.addEventListener("click", this.check);
        let tel = document.getElementById("tel");
        tel.addEventListener("mousedown", this.checktel);
        tel.addEventListener("keyup", this.checktel);
        tel.addEventListener("mouseleave", this.checktelOneMore);
        let name = document.getElementById("name");
        name.addEventListener("keyup", this.checkname);
        let email = document.getElementById("email");
        email.addEventListener("mouseleave", this.checkemail);

    }
    check() {
        let check = [];
        if (document.getElementById("name").value.match(/[a-zA-Zа-яА-Я\s]{3,}/ig)) {
            check[0] = true;
        } else {
            document.getElementsByTagName("div")[0].setAttribute("class", "red");
            check[0] = false;
        }
        if (document.getElementById("email").value.match(/^[a-zа-я0-9._-]+@[a-z0-9.-_]+\.[a-z0-9-_]{2,4}/ig)) {
            check[1] = true;
        } else {
            document.getElementsByTagName("div")[2].setAttribute("class", "red");
            check[1] = false;
        }
        if (document.getElementById("tel").value != "+7(000)000-00-00" &&
            document.getElementById("tel").value.match(/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/i)) {
            check[2] = true;
        } else {
            document.getElementsByTagName("div")[1].setAttribute("class", "red");
            check[2] = false;
        }
        if (check[0], check[1], check[2]) {
            document.getElementById("answer").innerText = "Ваше сообщение:\n"
            document.getElementById("answer").innerText += document.getElementById("comment").value;
            document.getElementById("answer").innerText += "\n";
            document.getElementById("answer").innerText += "Все поля заполнены верно!"
        }
    }
    checktel() {
        if (document.getElementById("tel").value == "+7(000)000-00-00") {
            document.getElementById("tel").value = "+7(";
        } else if (document.getElementById("tel").value.match(/\+7\([0-9]{3}$/i)) {
            document.getElementById("tel").value += ")";
        } else if (document.getElementById("tel").value.match(/\+7\([0-9]{3}\)[0-9]{3}$/i)) {
            document.getElementById("tel").value += "-";
        } else if (document.getElementById("tel").value.match(/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}$/i)) {
            document.getElementById("tel").value += "-";
        } else if (document.getElementById("tel").value.match(/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{3}/i)) {
            let tel = document.getElementById("tel").value;
            document.getElementById("tel").value = tel.substring(0, tel.length - 1);
        } else if (document.getElementById("tel").value.match(/[^0-9]$/i)) {
            let tel = document.getElementById("tel").value;
            document.getElementById("tel").value = tel.substring(0, tel.length - 1);
        }
        while (document.getElementById("tel").value.length > 16) {
            let tel = document.getElementById("tel").value;
            document.getElementById("tel").value = tel.substring(0, tel.length - 1);
        }
        if (document.getElementById("tel").value.length < 3) {
            document.getElementById("tel").value = "+7(";
        }
        if (document.getElementById("tel").value.length == 16 && !document.getElementById("tel").value.match(/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/i)) {
            document.getElementById("tel").value = "+7(";
        }
    }
    checktelOneMore() {
        if (!document.getElementById("tel").value.match(/\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}$/i)) {
            document.getElementById("texttel").innerText = "Неправильно набран номер!\nВведите номер ещё раз!";
            document.getElementById("tel").value = "+7(";
            document.getElementsByTagName("div")[1].setAttribute("class", "red");
        } else if (document.getElementById("tel").value != "+7(000)000-00-00") {
            document.getElementById("texttel").innerText = " ";
            document.getElementsByTagName("div")[1].setAttribute("class", "normal");
        }
    }
    checkname() {
        while (document.getElementById("name").value.match(/[^a-zA-Zа-яА-Я\s]/i)) {
            let name = document.getElementById("name").value;
            document.getElementById("name").value = name.substring(0, name.length - 1);
        }
        if (document.getElementById("name").value.match(/[a-zA-Zа-яА-Я\s]{3,}/ig)) {
            document.getElementsByTagName("div")[0].setAttribute("class", "normal");
        }
    }
    checkemail() {
        if (!document.getElementById("email").value.match(/^[a-zа-я0-9._-]+@[a-z0-9.-_]+\.[a-z0-9-_]{2,4}/ig)) {
        } else {
            document.getElementsByTagName("div")[2].setAttribute("class", "normal");
        }
    }
}

let read = new readForm();
read.getForm();