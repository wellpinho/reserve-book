function calcularTotalPedidos(price, quantity) {
    return price * quantity;
}

const totalPedidos = calcularTotalPedidos(20, 3);
console.log(totalPedidos);

function calcularTotal({price, quantity}) {
    return price * quantity;
}

const totalPedido = calcularTotal({price: 20, quantity: 3});

const pedidoDTO = {
    price: 20,
    quantity: 3
}

const totalPedido2 = calcularTotal(pedidoDTO);

// repository.getById();