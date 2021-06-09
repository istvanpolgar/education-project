const sign = (value) => {
    if (value > 0)
        return "+";
    else
        return "-";
}

const question1 = () => {
    let a = Math.random() * 30 + 1;
    let b = Math.random() * 30 + 1;
    let text = "Oldd meg a $" + a + "x" + sign(b) + Math.abs(b) + "=0$ egyenletet a valós szánok halmazán!";
    return text;
}

const answer1 = () => {
    let text = "$" + a + "x" + sign(b) + Math.abs(b) + "=0 \\Leftrightarrow \n";
    text = text + a + "x=" + (-b) + "\\Leftrightarrow \n";
    text = text + "x=" + "\\frac{" + (-b) + "}{" + a + "}";
}

const generated_exercise = (type) => {
    const function_name = "question" + type + "();";
    eval(function_name);
};

module.exports = generated_exercise;