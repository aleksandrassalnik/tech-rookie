document.getElementById('submit').addEventListener('click', () => {
    const yCells = document.getElementById('y-cells').value;
    const xCells = document.getElementById('x-cells').value;
    if (yCells && xCells && Number.isInteger(parseInt(yCells)) && Number.isInteger(parseInt(xCells))) {
        const table = document.getElementById('grid');
        const buttons = document.getElementById('buttons');
        buttons.innerHTML = '';
        const turnRight = document.createElement('button');
        turnRight.id = 'turnRight';
        turnRight.innerText = 'Turn right';
        buttons.append(turnRight);
        const moveForward = document.createElement('button');
        moveForward.id = 'moveForward';
        moveForward.innerText = 'moveForward';
        buttons.append(moveForward);

        table.innerHTML = '';
        for (let i = 0; i < yCells; i++) {
            const tr = document.createElement('tr');
            table.append(tr);
            for (let j = 0; j < xCells; j++) {
                const td = document.createElement('td');
                tr.append(td);
            }
        }
        window.localStorage.setItem('arrowPosition', '[0, 0]');
        window.localStorage.setItem('arrowDirection', '>');
        table.rows[0].cells[0].innerHTML = '>'
        document.getElementById('turnRight').addEventListener('click', rotate)
        document.getElementById('moveForward').addEventListener('click', forward)
    }
})


function rotate() {
    const position = JSON.parse(window.localStorage.getItem('arrowPosition'));
    const direction = window.localStorage.getItem('arrowDirection');
    const table = document.getElementById('grid');
    if (direction == '>') {
        window.localStorage.setItem('arrowDirection', '\\/')
        table.rows[position[0]].cells[position[1]].innerHTML = '\\/';
    }
    if (direction == '\\/') {
        window.localStorage.setItem('arrowDirection', '<')
        table.rows[position[0]].cells[position[1]].innerHTML = '<';
    }
    if (direction == '<') {
        window.localStorage.setItem('arrowDirection', '/\\')
        table.rows[position[0]].cells[position[1]].innerHTML = '/\\';
    }
    if (direction == '/\\') {
        window.localStorage.setItem('arrowDirection', '>')
        table.rows[position[0]].cells[position[1]].innerHTML = '>';
    }
}

function forward() {
    const position = JSON.parse(window.localStorage.getItem('arrowPosition'));
    const direction = window.localStorage.getItem('arrowDirection');
    const table = document.getElementById('grid');
    if (direction == '>') {
        table.rows[position[0]].cells[position[1]].innerHTML = '';
        if (position[1] + 1 < table.rows[0].cells.length) {
            position[1]++;
            table.rows[position[0]].cells[position[1]].innerHTML = '>';
            window.localStorage.setItem('arrowPosition', JSON.stringify(position));
        }
        else {
            rotate();
        }
    }
    if (direction == '\\/') {
        table.rows[position[0]].cells[position[1]].innerHTML = '';
        if (position[0] + 1 < table.rows.length) {
            position[0]++;
            table.rows[position[0]].cells[position[1]].innerHTML = '\\/';
            window.localStorage.setItem('arrowPosition', JSON.stringify(position));
        }
        else {
            rotate();
        }
    }
    if (direction == '<') {
        table.rows[position[0]].cells[position[1]].innerHTML = '';
        if (position[1] - 1 < table.rows[0].cells.length && position[1] - 1 >= 0) {
            position[1]--;
            table.rows[position[0]].cells[position[1]].innerHTML = '<';
            window.localStorage.setItem('arrowPosition', JSON.stringify(position));
        }
        else {
            rotate();
        }
    }
    if (direction == '/\\') {
        table.rows[position[0]].cells[position[1]].innerHTML = '';
        if (position[0] - 1 < table.rows.length && position[0] - 1 >= 0) {
            position[0]--;
            table.rows[position[0]].cells[position[1]].innerHTML = '/\\';
            window.localStorage.setItem('arrowPosition', JSON.stringify(position));
        }
        else {
            rotate();
        }
    }
}
