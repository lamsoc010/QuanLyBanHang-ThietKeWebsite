// Tạo ra đối tượng Item giỏ hàng
// Input: idSanPham, soLuong
// Output: ItemGiohang

function TaoDoiTuongItemGioHang(idSanPham, soLuong) {
    var itemGioHang = new Object();
    itemGioHang.idSanPham = idSanPham;
    itemGioHang.soLuong = soLuong;

    return itemGioHang;
}

// Lấy danh sách Item giỏ hàng đang lưu trữ trong localStorage
function LayDanhSachItemGioHang() {
    var danhSachItemGioHang = new Array();

    var jsonDanhSachItemGioHang = localStorage.getItem('danhSachItemGioHang');

    if(jsonDanhSachItemGioHang !== null)
        danhSachItemGioHang = JSON.parse(jsonDanhSachItemGioHang);

    return danhSachItemGioHang;
}

// Lưu trữ danh sách xuống localStorage
function LuuTruDanhSachItemXuongLocal(danhSachItemGioHang) {
    var jsonDanhSachItemGioHang = JSON.stringify(danhSachItemGioHang);
    localStorage.setItem('danhSachItemGioHang',jsonDanhSachItemGioHang);
}

function LaySanPhamTheoID(idSanPham) {
    var sanPham = new Object();
    return sanPham;
}

function XoaSanPhamKhoiDanhSachSanPham (idSanPham) {
    var danhSachItemGioHang = LayDanhSachItemGioHang();
    console.log(danhSachItemGioHang);
    for (var i = 0; i < danhSachItemGioHang.length; i++) {
        var itemGioHangHienTai = danhSachItemGioHang[i];
        if(itemGioHangHienTai.idSanPham == idSanPham){
            danhSachItemGioHang.splice(i,1);
        }
    }
    LuuTruDanhSachItemXuongLocal(danhSachItemGioHang);
    HienThiDanhSachItemGioHang();

}
// Hiển thị danh sách ra HTML
function HienThiDanhSachItemGioHang() {
    // Lấy danh sách từ localStorage
    var danhSachItemGioHang = LayDanhSachItemGioHang();

    // Chuyển danh sách thành HTML
    var HTML = ChuyenDanhSachItemGioHangThanhHTML(danhSachItemGioHang);

    // Truy cập vào giỏ hàng và hiển thị
    var nodeGioHang = document.getElementById('items');
    nodeGioHang.innerHTML = HTML;
}

// Chuyển danh sách thành html
function ChuyenDanhSachItemGioHangThanhHTML(danhSachItemGioHang) {

    var htmlTong = '';
    if(danhSachItemGioHang == null || danhSachItemGioHang == ''){
        htmlTong = `<h5>Giỏ hàng trống, chưa có sản phẩm nào</h5> 
                <br> <h5> <a href="index.html"> Click vào đây để tiếp tục mua hàng nào!! </a> </h5>
                `;
    }
    else {
        htmlTong = `
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Sản Phẩm</th>
                <th scope="col">Tên</th>
                <th scope="col">Đơn Giá</th>
                <th scope="col">Số Lượng</th>
                <th scope="col">Tổng Tiền</th>
                <th scope="col">Thao Tác</th>
            </tr>
        </thead>
        `;
    }
    var stt=1;
    
    for(var i = 0; i < danhSachItemGioHang.length; i++) {
        htmlTong = htmlTong + ChuyenDoiTuongItemGioHangThanhHTML(danhSachItemGioHang[i],stt);
        stt++;
    }
    
    return htmlTong;
}

// Chuyển đối tượng thành html
function ChuyenDoiTuongItemGioHangThanhHTML(itemGioHang,stt) {
    // Lấy sản phẩm theo ID 
    
    var sanPham = TruyXuatSanPhamTheoID(itemGioHang.idSanPham);
    
    var tongTien = sanPham.tinhGiamGia() * itemGioHang.soLuong;  
    

    var html = `
        <tr class="item-sanpham">
        <th scope="row">${stt}</th>
        <td class="item-hinhanh">
            <img src="${sanPham.hinhAnhSau}" alt="">
        </td>
        <td class="item-ten">
            ${sanPham.ten}
        </td>
        <td class="item-dongia">
            <span class="item-dongia--giagoc"><strike>${sanPham.giaGoc} đ</strike></span>
            <span class="item-dongia--giaban">${sanPham.tinhGiamGia()} đ</span>
        </td>
        <td class="item-soluong">
            <input type="number" name="soluong" id="soluong" value="${itemGioHang.soLuong}" >
        </td>
        <td class="item-tongtien">
            <span>${tongTien} đ</span>
        </td>
        <td class="item-hanhdong">
            <i class="bi bi-trash-fill" onclick="XoaSanPhamKhoiDanhSachSanPham('${itemGioHang.idSanPham}')"></i>
        </td>
    </tr>
    `;
    stt = stt+1;
    return html;
}


// Đưa vào giỏ hàng
function DuaVaoGioHang(idSanPham) {
    var sanphamtronggiohang = document.getElementById('sanphamtronggiohang');
    // Láy danh sách item giỏ hàng từ localStorage lên
    var danhSachItemGioHang = LayDanhSachItemGioHang();

    // Check xem item giỏ hàng đó đã tồn tại chưa
    var coTonTaiItemTrongDanhSachGioHang = false;
    for(var i = 0 ; i < danhSachItemGioHang.length; i++ ){
        var itemGioHangHienTai = danhSachItemGioHang[i];
        // Nếu tồn tại thì tăng số lượng lên 1
        if(itemGioHangHienTai.idSanPham == idSanPham) {
            itemGioHangHienTai.soLuong++;
            coTonTaiItemTrongDanhSachGioHang = true; 
        }
    }
    // Còn không tồn tại thì tạo mới 1 đối tượng và lưu vào danhSachItemGioHang
    if(coTonTaiItemTrongDanhSachGioHang == false) {
        var itemGioHang = TaoDoiTuongItemGioHang(idSanPham, 1);
        danhSachItemGioHang.push(itemGioHang);
    }
    // Lưu trữ vào localStorage
    sanphamtronggiohang.innerHTML = `
    Giỏ hàng <br>
    ${danhSachItemGioHang.length} sản phẩm
    `;
    LuuTruDanhSachItemXuongLocal(danhSachItemGioHang);
}