let cart = []; 

function addToCart(name, price) { 
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Tambah jumlah jika sudah ada
    } else {
        cart.push({ name, price, quantity: 1 }); // Tambahkan item baru
    }
    showCart();
    updateButtonState();
} 
    
function showCart() { 
    const cartBody = document.getElementById('cartBody'); 
    cartBody.innerHTML = ''; 
    
    let totalHarga = 0;

    cart.forEach((item, index) => { 
        const row = document.createElement('tr'); 
        row.innerHTML = ` 
            <td>${item.name}</td> 
            <td>Rp ${item.price.toLocaleString()}</td>
            <td>
                <button onclick="updateQuantity(${index}, -1)">-</button> 
                ${item.quantity} 
                <button onclick="updateQuantity(${index}, 1)">+</button>
            </td> 
            <td>Rp ${(item.price * item.quantity).toLocaleString()}</td>
            <td><button onclick="removeFromCart(${index})">Hapus</button></td> 
        `; 
        cartBody.appendChild(row); 

        // Tambahkan ke total harga keseluruhan
        totalHarga += item.price * item.quantity;
    }); 

    // Tambahkan baris untuk total keseluruhan
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3" style="text-align: right; font-weight: bold;">Total Keseluruhan:</td>
        <td colspan="2" style="font-weight: bold;">Rp ${totalHarga.toLocaleString()}</td>
    `;
    cartBody.appendChild(totalRow);

    document.getElementById('cartModal').style.display = 'block'; 
} 
    
function updateQuantity(index, change) {
    cart[index].quantity += change;

    // Hapus item jika quantity <= 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    showCart();
    updateButtonState();
}

function removeFromCart(index) { 
    cart.splice(index, 1); 
    showCart(); 
    updateButtonState();
} 

// Menutup modal ketika klik di luar modal
window.onclick = function (event) {
    const modal = document.getElementById('cartModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

const nomorWhatsApp = "6289521958537";

document.getElementById("pesansekarang").addEventListener("click", function () {
    if (cart.length === 0) {
        // Tampilkan pesan peringatan jika keranjang kosong
        alert("Pilih barang yang mau dibeli!");
        return; // Hentikan fungsi jika keranjang kosong
    }

    let pesan = "Pesanan Anda:\n\n";
    cart.forEach(item => {
        pesan += `${item.name} x ${item.quantity}: Rp ${(item.price * item.quantity).toLocaleString()}\n`;
    });
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    pesan += `\nTotal Keseluruhan: Rp ${total.toLocaleString()}`;

    const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
});

// Inisialisasi tombol saat pertama kali
function updateButtonState() {
    const button = document.getElementById("pesansekarang");
    button.disabled = cart.length === 0;
}

window.onload = updateButtonState;