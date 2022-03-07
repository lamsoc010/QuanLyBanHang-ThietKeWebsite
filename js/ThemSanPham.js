function ThemSanPham() {
    var danhSachSanPham =JSON.parse(localStorage.getItem('danhSachSanPham'));
        if(danhSachSanPham === null) {
            danhSachSanPham = new Array();
        }
    // 1: Truy cập Node để lấY dữ liệu
    var NodeMaSanPham = document.getElementById('maSanPham');
    var maSanPham = NodeMaSanPham.value;

    var NodeHinhAnhTruoc = document.getElementById('hinhAnhTruoc');
    var hinhAnhTruoc = NodeHinhAnhTruoc.value;

    var NodeHinhAnhSau = document.getElementById('hinhAnhSau');
    var hinhAnhSau = NodeHinhAnhSau.value;

    var NodeTen = document.getElementById('ten');
    var ten = NodeTen.value;

    var NodeGiaGoc = document.getElementById('giaGoc');
    var giaGoc = parseInt(NodeGiaGoc.value);

    var NodePhanTramGiamGia = document.getElementById('phanTramGiamGia');
    var phanTramGiamGia = parseFloat(NodePhanTramGiamGia.value);

    // 2: Tạo đối tượng cho sản phâm bằng cách gọi file index.js qua
    var sanPham = TaoDoiTuongSanPham(maSanPham, hinhAnhTruoc, hinhAnhSau, ten,giaGoc,phanTramGiamGia,null);

    danhSachSanPham.push(sanPham);

    // Thêm danh sách sản phẩm vào localStorage
    var jsonDanhSachSanPham = JSON.stringify(danhSachSanPham);
    localStorage.setItem('danhSachSanPham',jsonDanhSachSanPham);
    console.log(danhSachSanPham)
    LayThongTinSanPhamDeHienThiVaoDanhSach();
}
// Hiển thị ra HTML

function LayThongTinSanPhamDeHienThiVaoDanhSach() {
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachSanPham = TaoDoiTuongSanPham().fromJsons(jsonDanhSachSanPham);
    // 2:Chuyển danh sách đối tượng thành HTML
    var HTML = chuyenDanhSachDoiTuongSanPhamHienThiRaDanhSachSanPham(danhSachSanPham);

    // 3: Gắn đoạn HTML vào id sanPhamGiamGia
    var nodeBangLuuTru = document.getElementById('phanthanluutru');
    nodeBangLuuTru.innerHTML = HTML;  
    // console.log(danhSachSanPham)
}


// Hiển thị danh sách sản phẩm ở bảng luu trữ
function chuyenDanhSachDoiTuongSanPhamHienThiRaDanhSachSanPham(danhSachSanPham) {
    var HTMLDanhSachSanPham ='';
    var stt=1;
    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var htmlSanPham = chuyenDoiTuongSanPhamThanhHienThiRaDanhSachSanPham(sanPham,stt);
        HTMLDanhSachSanPham += htmlSanPham;
        stt++;
    }
    
    return HTMLDanhSachSanPham;
}

// Truyền vào 1 đối tượng sản phẩm ra đầu ra là 1 HTML
function chuyenDoiTuongSanPhamThanhHienThiRaDanhSachSanPham(sanPham,stt) {
    var sanPham = TaoDoiTuongSanPham(sanPham.maSanPham, sanPham.hinhAnhTruoc,sanPham.hinhAnhSau,sanPham.ten,sanPham.giaGoc,sanPham.phanTramGiamGia,sanPham.id);
    var html = `
        <tr>
        <th scope="row">${stt}</th>
        <td>${sanPham.maSanPham}</td>
        <td>
            <img src="${sanPham.hinhAnhTruoc}" alt="">
        </td>
        <td>
            <img src="${sanPham.hinhAnhSau}" alt="">
        </td>
        <td>${sanPham.ten}</td>
        <td>${sanPham.giaGoc}</td>
        <td>${sanPham.phanTramGiamGia}</td>
        <td>
            <button onclick="SuaThongTinSanPham('${sanPham.id}')" id="nutbamsua">Sửa</button>
        </td>
        <td>
            <button onclick="XoaSanPhamRaKhoiDanhSanh('${sanPham.id}')">Xoá</button>
        </td>
        </tr>
    `;
    

    return html;
    }

// // Hàm sửa thông tin sản phẩm
function SuaThongTinSanPham(idSanPham) {
    var maSanPham = document.getElementById('maSanPham');
    var hinhAnhTruoc = document.getElementById('hinhAnhTruoc');
    var hinhAnhSau = document.getElementById('hinhAnhSau');
    var ten = document.getElementById('ten');
    var giaGoc = document.getElementById('giaGoc');
    var phanTramGiamGia = document.getElementById('phanTramGiamGia');
    var nutbamthemsanpham = document.getElementById('form-submit-add');
    var themsanpham = document.getElementById('themsanpham');
    var luulai = document.getElementById('form-submit-save');
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });

    var jsonDanhSachItemSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachItemSanPham = JSON.parse(jsonDanhSachItemSanPham);
    for(var i = 0; i < danhSachItemSanPham.length; i++) {
        var itemGioHangHienTai = danhSachItemSanPham[i];
        if(itemGioHangHienTai.id === idSanPham) {
            maSanPham.value = `${itemGioHangHienTai.maSanPham}`;
            hinhAnhTruoc.value = `${itemGioHangHienTai.hinhAnhTruoc}`;
            hinhAnhSau.value = `${itemGioHangHienTai.hinhAnhSau}`;
            ten.value = `${itemGioHangHienTai.ten}`;
            giaGoc.value = `${itemGioHangHienTai.giaGoc}`;
            phanTramGiamGia.value = `${itemGioHangHienTai.phanTramGiamGia}`;
            nutbamthemsanpham.style.display = "";
            luulai.innerHTML = `<a class="form-submit" id="form-submit-save" onclick="LuuLaiSanPhamDaSua('${idSanPham}')">Lưu Lại</a>`
            luulai.style.display ="";
        }
    }
}

// // Lưu lại sản phẩm đã sữa
function LuuLaiSanPhamDaSua(idSanPham) {
    var maSanPham = document.getElementById('maSanPham').value;
    var hinhAnhTruoc = document.getElementById('hinhAnhTruoc').value;
    var hinhAnhSau = document.getElementById('hinhAnhSau').value;
    var ten = document.getElementById('ten').value;
    var giaGoc = document.getElementById('giaGoc').value;
    var phanTramGiamGia = document.getElementById('phanTramGiamGia').value;

    var luulai = document.getElementById('form-submit-save');

    var jsonDanhSachItemSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachItemSanPham = JSON.parse(jsonDanhSachItemSanPham);
    console.log(danhSachItemSanPham)

    for(var i = 0; i < danhSachItemSanPham.length; i++) {
        var itemGioHangHienTai = danhSachItemSanPham[i];
        if(itemGioHangHienTai.id === idSanPham) {
            itemGioHangHienTai.maSanPham = maSanPham;
            itemGioHangHienTai.hinhAnhTruoc = hinhAnhTruoc;
            itemGioHangHienTai.hinhAnhSau = hinhAnhSau;
            itemGioHangHienTai.ten = ten;
            itemGioHangHienTai.giaGoc = giaGoc;
            itemGioHangHienTai.phanTramGiamGia = phanTramGiamGia;
            console.log(danhSachItemSanPham)

            jsonSetDanhSachItemSanPham = JSON.stringify(danhSachItemSanPham);
            localStorage.setItem('danhSachSanPham',jsonSetDanhSachItemSanPham)
            luulai.style.display = "none";
            LayThongTinSanPhamDeHienThiVaoDanhSach();
        }
    }
}


// Xoá sản phẩm ra khỏi danh sách
function XoaSanPhamRaKhoiDanhSanh(idSanPham) {
    var jsonDanhSachItemSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachItemSanPham = JSON.parse(jsonDanhSachItemSanPham);
    for(var i = 0; i < danhSachItemSanPham.length; i++) {
        var itemGioHangHienTai = danhSachItemSanPham[i];
        if(itemGioHangHienTai.id === idSanPham) {
            danhSachItemSanPham.splice(i,1);
        }
    }
    console.log(danhSachItemSanPham);
    jsonSetDanhSachItemSanPham = JSON.stringify(danhSachItemSanPham);
    localStorage.setItem('danhSachSanPham',jsonSetDanhSachItemSanPham)
    LayThongTinSanPhamDeHienThiVaoDanhSach();

}   
