const productos = [
    { id: '60g-natural', nombre: 'Natural 60g', precio: 0.75 },
    { id: '60g-cheddar', nombre: 'Cheddar 60g', precio: 0.75 },
    { id: '60g-ajo', nombre: 'Ajo 60g', precio: 0.75 },
    { id: '60g-picante', nombre: 'Picante 60g', precio: 0.75 },
    { id: '120g-natural', nombre: 'Natural 120g', precio: 1.00 },
    { id: '120g-cheddar', nombre: 'Cheddar 120g', precio: 1.00 },
    { id: '120g-ajo', nombre: 'Ajo 120g', precio: 1.00 },
    { id: '120g-picante', nombre: 'Picante 120g', precio: 1.00 }
];

function actualizarTotal() {
    let acumuladoUSD = 0;
    const tasa = parseFloat(document.getElementById('tasa-bcv').value) || 0;

    productos.forEach(prod => {
        const cantidad = parseInt(document.getElementById(prod.id).value) || 0;
        acumuladoUSD += cantidad * prod.precio;
    });

    let acumuladoBs = acumuladoUSD * tasa;
    document.getElementById('total-usd').textContent = acumuladoUSD.toFixed(2);
    document.getElementById('total-bs').textContent = acumuladoBs.toFixed(2);
}

document.querySelectorAll('.input-cantidad').forEach(input => {
    input.addEventListener('input', actualizarTotal);
});
document.getElementById('tasa-bcv').addEventListener('input', actualizarTotal);

document.getElementById('formulario-pedido').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const telefono = "584162755555"; 
    const nombre = document.getElementById('nombre-cliente').value.trim();
    const direccion = document.getElementById('direccion-cliente').value.trim();
    const tasaDia = parseFloat(document.getElementById('tasa-bcv').value) || 0;

    let textoPedido = "*NUEVO PEDIDO - DON TOSTÓN*\n\n";
    textoPedido += "*Cliente:* " + nombre + "\n";
    textoPedido += "*Dirección:* " + direccion + "\n";
    textoPedido += "*Tasa BCV:* Bs. " + tasaDia.toFixed(2) + "\n\n";
    textoPedido += "*Detalle de Productos:*\n";

    let tieneProductos = false;
    let granTotalUSD = 0;

    productos.forEach(prod => {
        const cantidad = parseInt(document.getElementById(prod.id).value) || 0;
        if (cantidad > 0) {
            const subtotalUSD = cantidad * prod.precio;
            granTotalUSD += subtotalUSD;
            textoPedido += "• " + prod.nombre + " x" + cantidad + " ($" + subtotalUSD.toFixed(2) + ")\n";
            tieneProductos = true;
        }
    });

    if (!tieneProductos) {
        alert("Por favor, selecciona al menos un producto para generar tu orden.");
        return;
    }

    let granTotalBs = granTotalUSD * tasaDia;
    textoPedido += "\n*TOTAL EN DÓLARES:* $" + granTotalUSD.toFixed(2);
    textoPedido += "\n*TOTAL EN BOLÍVARES (BCV):* Bs. " + granTotalBs.toFixed(2);

    var url = "https://whatsapp.com" + telefono + "&text=" + encodeURIComponent(textoPedido);
    window.open(url, '_blank');
});
