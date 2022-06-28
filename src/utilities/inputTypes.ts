function numberInput(options: string[]): void {
    document.addEventListener('keyup', (e) => {
        if (e.code === "Digit1") { document.getElementById('0')?.click() }
        if (e.code === "Digit2") { document.getElementById('1')?.click() }
        if (e.code === "Digit3") { document.getElementById('2')?.click() }
        if (e.code === "Digit4" && options.length >= 4) { document.getElementById('3')?.click() }
        if (e.code === "Digit5" && options.length >= 5) { document.getElementById('4')?.click() }
        if (e.code === "Digit6" && options.length >= 6) { document.getElementById('5')?.click() }
    });
}

function arrowInput(options: string[]): void {
    document.addEventListener('keyup', (e) => {
        if (e.code === "ArrowUp") { document.getElementById('0')?.click() }
        if (e.code === "ArrowLeft") { document.getElementById('1')?.click() }
        if (e.code === "ArrowRight") { document.getElementById('2')?.click() }
        if (e.code === "ArrowDown" && options.length >= 4) { document.getElementById('3')?.click() }
    });
}


export { numberInput, arrowInput }