function numberInput(options: string[]): void {
    document.addEventListener('keyup', (e) => {
        if (e.code === "Digit1") { document.getElementById('0')?.click() }
        if (e.code === "Digit2") { document.getElementById('1')?.click() }
        if (e.code === "Digit3") { document.getElementById('2')?.click() }
        if (e.code === "Digit4") { document.getElementById('3')?.click() }
        if (e.code === "Digit5") { document.getElementById('4')?.click() }
    });
}


export { numberInput}