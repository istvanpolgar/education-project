const { exec } = require('child_process');
const generated_exercise = require('./exercises/category_1');
fs = require('fs');

const createTxt = (exercises, params) => {
    console.log(params);
    const PDFextention = ".pdf";
    const TEXextention = ".tex";
    const fileName = "Feladatlap";
    const latexPath = "src\\latex\\pdflatex.exe";
    let text = "";
    const header = "\\documentclass[12pt]{article}\n" + 
    "\\usepackage{color}\n" +
    "\\usepackage{amsmath, geometry}\n" +
    "\\usepackage{amsfonts}\n" +
    "\\usepackage{amssymb}\n" +
    "\\usepackage[utf8]{inputenc}\n" +
    "\\usepackage[magyar]{babel}\n" +
    "\\usepackage{multicol}\n" +
    "\\usepackage{enumitem}\n" +
    "\\usepackage{pgf,tikz}\n" +
    "\\usepackage{mathrsfs}\n" +
    "\\usepackage{fancyhdr}\n" +
    "\\usetikzlibrary{arrows}\n" +
    "\\newtheorem{fel}{Feladat}\n" +
    "\\newtheorem{meg}{Megoldás}\n" +
    "\\newtheorem{megj}{Megjegyzés}\n" +
    "\\usepackage{cite}\n" +
    "\\usetikzlibrary{arrows}\n" +
    "\\usetikzlibrary[patterns]\n" +
    "\\geometry{\n" +
    "a4paper,\n" +
    "total={170mm,257mm},\n" +
    "left=20mm,\n" +
    "top=20mm,}\n" +
    "\\thispagestyle{fancy}\n" +
    "\\fancyfoot[C]{" + `${params.begin}` + 
    " - " + `${params.end}` + "}\n" +
    "\\fancyhead[C]{\\title{" + `${params.title}` + 
    " \\vspace{-3ex}} \\maketitle \\vspace{-5ex}}\n" +
    "\\renewcommand{\\footrulewidth}{1pt} \n" +
    "\\setlength{\\headheight}{150pt} \n" +
    "\\setlength{\\textheight}{600pt} \n" +
    "\\begin{document}\n\n";
    const footer = "\n\n\\end{document}\n";

    console.log(exercises);

    exercises.map( ex => {
        for(let i=1;i<=ex.nr;i++)
            text = text + generated_exercise(1);
    });

    txt = header + text + footer;

    fs.writeFile( "./src/files/" + fileName + TEXextention, txt, 
    function (err) {
        if (err) 
            return console.log(err);
    });

    exec( latexPath + " -output-directory=src\\files " +  " src\\files\\" + fileName + TEXextention, 
    (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    }); 
}

module.exports = createTxt;