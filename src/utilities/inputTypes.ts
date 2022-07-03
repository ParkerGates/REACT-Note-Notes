function numberInput(e:any): void {
    if (e.code === "Digit1") {
        document.getElementById('0')?.click();
        document.removeEventListener("keyup", numberInput);
    }
    else if (e.code === "Digit2") {
        document.getElementById('1')?.click();
        document.removeEventListener("keyup", numberInput);
    }
    else if (e.code === "Digit3") {
        document.getElementById('2')?.click();
        document.removeEventListener("keyup", numberInput);
    }
    else if (e.code === "Digit4" && document.getElementById('3') !== null) {
        document.getElementById('3')?.click();
        document.removeEventListener("keyup", numberInput);
    }
    else if (e.code === "Digit5" && document.getElementById('4') !== null) {
        document.getElementById('4')?.click();
        document.removeEventListener("keyup", numberInput);
    }
    else if (e.code === "Digit6" && document.getElementById('5') !== null) {
        document.getElementById('5')?.click();
        document.removeEventListener("keyup", numberInput);
    }
}

function arrowInput(e: any): void {
    if (e.code === "ArrowUp") {
        document.getElementById('0')?.click();
        document.removeEventListener("keyup", arrowInput);
    }
    else if (e.code === "ArrowLeft") {
        document.getElementById('1')?.click();
        document.removeEventListener("keyup", arrowInput);
    }
    else if (e.code === "ArrowRight") {
        document.getElementById('2')?.click();
        document.removeEventListener("keyup", arrowInput);
    }
    else if (e.code === "ArrowDown" && document.getElementById('3') !== null) {
        document.getElementById('3')?.click();
        document.removeEventListener("keyup", arrowInput);
    }
}

export { numberInput, arrowInput }