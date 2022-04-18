function jKarte(x, y) {
    return (new Array(x)).fill().map(function() {
        return new Array(y).fill(0);
    });
}

function bomb(x, y, laukums, speletajs) {
    try {
        let pretejais;

        if (!(laukums[y][x] === pretejais)) {
            laukums[y][x] = speletajs;
        }
        if ((x + 1) < laukums[0].length && !(laukums[y][x + 1] === 1)) {
            laukums[y][x + 1] = speletajs;
        }
        if ((y + 1) < laukums.length && !(laukums[y + 1][x] === 1)) {
            laukums[y + 1][x] = speletajs;
        }
        if ((x - 1) >= 0 && !(laukums[y][x - 1] === 1)) {
            laukums[y][x - 1] = speletajs;
        }
        if ((y - 1) >= 0 && !(laukums[y - 1][x] === 1)) {
            laukums[y - 1][x] = speletajs;
        }
    } catch (err) {}
    return laukums;
}

function punkti(player, laukums) {
    var skaits = 0;
    for (let i = 0; i < laukums.length; i++) {
        for (let j = 0; j < laukums[0].length; j++) {
            if (laukums[i][j] === player) {
                skaits++;
            }
        }
    }
    return skaits;
}

function uzvaretjs(laukums) {
    let uzvar = null;
    if (end(laukums) === true) {
        let speletajs1 = punkti(1, laukums);
        let speletajs2 = punkti(2, laukums);
        if (speletajs1 > speletajs2) {
            uzvar = -1;
        } else if (speletajs2 > speletajs1) {
            uzvar = 1;
        } else {
            uzvar = 0;
        }
    }
    return uzvar;
}

function end(laukums) {
    let ending = true;
    for (let k = 0; k < laukums.length; k++) {
        for (let m = 0; m < laukums[0].length; m++) {
            if (laukums[k][m] === 0) {
                ending = false;
            }
        }
    }
    if (ending === true) {
        return true;
    }
}

function ai(practice) {
    let labNovertejums = -Infinity;
    let x, y;
    for (let i = 0; i < practice.length; i++) {
        for (let j = 0; j < practice[0].length; j++) {
            if (practice[i][j] === 0) {
                practice = bomb(j, i, practice, 2);
                console.log("iet cauri");
                console.table(practice);
                let Novertejums = minmax(practice, 0, false);
                practice = bomb(j, i, practice, 0);
                if (Novertejums > labNovertejums) {
                    labNovertejums = Novertejums;
                    x = j;
                    y = i;
                }
            }
        }
    }
    return { x, y };
}


function minmax(practiceai, dzilums, maximize) {
    let rezultats = uzvaretjs(practiceai);
    if (rezultats !== null) {
        console.log("rezultats", rezultats);
        return rezultats;
    }

    if (maximize === true) {
        let labNovertejums = -Infinity;
        for (let i = 0; i < practiceai.length; i++) {
            for (let j = 0; j < practiceai[0].length; j++) {
                if (practiceai[i][j] === 0) {
                    practiceai = bomb(j, i, practiceai, 2);
                    console.log("max", j, i, dzilums);
                    console.table(practiceai);
                    let Novertejums = minmax(practiceai, dzilums + 1, false);
                    practiceai = bomb(j, i, practiceai, 0);
                    if (Novertejums > labNovertejums) {
                        labNovertejums = Novertejums;
                        console.log("maxnov", labNovertejums);
                    }
                }
            }
        }
        return labNovertejums;
    } else {
        let labNovertejums = Infinity;
        for (let i = 0; i < practiceai.length; i++) {
            for (let j = 0; j < practiceai[0].length; j++) {
                if (practiceai[i][j] === 0) {
                    practiceai = bomb(j, i, practiceai, 1);
                    console.log("min", j, i, dzilums);
                    console.table(practiceai);
                    let Novertejums = minmax(practiceai, dzilums + 1, true);
                    practiceai = bomb(j, i, practiceai, 0);
                    if (Novertejums < labNovertejums) {
                        labNovertejums = Novertejums;
                        console.log("minnov", labNovertejums);
                    }
                }
            }
        }
        return labNovertejums;
    }
}

let laukums = jKarte(6, 8);
let iet = null;

function starts(id) {
    console.log("iet: ", iet);
    if (iet === 1) {
        let coord = id.split("");
        let x, y;
        x = parseInt(coord[1]);
        y = parseInt(coord[0]);
        console.log(typeof x, typeof y);
        console.log(x, y);
        laukums = bomb(x, y, laukums, iet);
        iet = 2;
    }
    console.table(laukums);
    console.log("Spēlētājs " + 1 + " punkti = " + punkti(1, laukums));
    console.log("Spēlētājs " + 2 + " punkti = " + punkti(2, laukums));
    console.log("gajiens " + iet);
    end(laukums);

    let { x, y } = ai(laukums);
    bomb(x, y, laukums, iet);
    iet = 1;

    console.table(laukums);
    console.log("Spēlētājs " + 1 + " punkti = " + punkti(1, laukums));
    console.log("Spēlētājs " + 2 + " punkti = " + punkti(2, laukums));
    console.log("gajiens " + iet);
    end(laukums);
}

function createBoard(laukums) {

    if (iet === null) {
        let confirmAction = confirm("Vai jūs vēlaties sākt?");
        if (confirmAction) {
            iet = 1;
        } else {
            iet = 2;
            starts(laukums);
        }
    }


    const clear = document.getElementById("board");
    clear.innerHTML = '';
    for (let i = 0; i < laukums.length; i++) {
        var tag = document.createElement("div");
        tag.setAttribute("class", "d-flex flex-row justify-content-center");
        tag.setAttribute("id", ("row" + i));
        var element = document.getElementById("board");
        element.appendChild(tag);
        for (let j = 0; j < laukums[0].length; j++) {
            var tag = document.createElement("button");
            var text = document.createTextNode(laukums[i][j]);
            if (!(laukums[i][j] === 0)) {
                tag.setAttribute("class", "border bg-red border-dark rounded m-1 p-2");
            } else {
                tag.setAttribute("class", "border border-dark rounded m-1 p-2");
            }
            tag.setAttribute("id", ("" + i + j));
            tag.setAttribute("onclick", "starts(this.id),createBoard(laukums)");
            tag.appendChild(text);
            var element = document.getElementById("row" + i);
            element.appendChild(tag);
        }
    }
}

window.onload = createBoard(laukums);