document.getElementById('submit-button').onclick = () => {
    // Get the values from the text boxes
    let pet = document.getElementById('pet').value;
    let quantity = document.getElementById('quantity').value;
    let color = document.getElementById('color').value;

    // initiliaze letterQuantity with the pet's name
    let letterQuantity = pet;

    // add an "s" to the pet name if quantity is greater than 1
    if (quantity > 1) {
        letterQuantity += "s";
    }

    // display the result message
    document.getElementById('result').innerHTML = `You ordered ${quantity} ${color} ${letterQuantity}`;   
}