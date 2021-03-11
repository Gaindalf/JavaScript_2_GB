function getText() {
    let text = document.getElementsByClassName("text")[0].innerText;
    text = text.replace(/\s'/ig, ' "')
    console.log(text);
    text = text.replace(/'\n/ig, '"\n');
    text = text.replace(/'$/ig, '"\n');
    document.getElementsByClassName("text")[1].innerText = text;
}
getText();