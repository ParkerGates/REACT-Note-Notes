function numberInput(options: string[]) {
    document.addEventListener('keyup', (e) => {
        if (e.code === "Digit1") { document.getElementById(`${options[0]}`)?.click() }
        if (e.code === "Digit2") { document.getElementById(`${options[1]}`)?.click() }
        if (e.code === "Digit3") { document.getElementById(`${options[2]}`)?.click() }
        if (e.code === "Digit4") { document.getElementById(`${options[3]}`)?.click() }
        if (e.code === "Digit5") { document.getElementById(`${options[4]}`)?.click() }
    });
}

export { numberInput, }