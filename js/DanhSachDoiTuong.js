function TaoDoiTuongSanPham(maSanPham,hinhAnhTruoc, hinhAnhSau, ten, giaGoc, phanTramGiamGia,id) {
    var sanPham = new Object();
    sanPham.maSanPham = maSanPham;
    sanPham.hinhAnhTruoc = hinhAnhTruoc;
    sanPham.hinhAnhSau = hinhAnhSau;
    sanPham.ten = ten;
    sanPham.giaGoc = giaGoc;
    sanPham.phanTramGiamGia = phanTramGiamGia;

    if( id != null) {
        sanPham.id = id;
    } else {
        sanPham.id = taoID();
    }

    // Tính phần trăm giảm giá
    sanPham.tinhGiamGia = function() {
        var giaBan = this.giaGoc * (1 - this.phanTramGiamGia);
        return giaBan;
    }

    sanPham.toJson = function() {
        var json = JSON.stringify(this);
        return json;
    }

    sanPham.fromJson = function(json) {
        var doiTuongDayDu = new Object();

        var doiTuong = JSON.parse(json);

        var doiTuongDayDu =TaoDoiTuongSanPham(doiTuong.maSanPham,doiTuong.hinhAnhTruoc,doiTuong.hinhAnhSau,doiTuong.ten,doiTuong.giaGoc,doiTuong.phanTramGiamGia)
        return doiTuongDayDu;
    }
    
    sanPham.fromJsons = function(jsonDanhSachSanPham) {
        var danhSachSanPhamDayDu = new Array();
        var danhSachSanPhamDayDu = JSON.parse(jsonDanhSachSanPham);

        for(var i = 0; i < danhSachSanPhamDayDu.length; i++) {
            var sanPham = danhSachSanPhamDayDu[i];
            var sanPhamDayDu = TaoDoiTuongSanPham(sanPham.maSanPham, sanPham.hinhAnhTruoc, sanPham.hinhAnhSau, sanPham.ten, sanPham.giaGoc, sanPham.phanTramGiamGia, sanPham.id)
            danhSachSanPhamDayDu[i] = sanPhamDayDu;
        }
        return danhSachSanPhamDayDu;
    }

    return sanPham;
}
// Chuyển một danh sách đối tượng thành một đoạn HTML để hiển thị lên website
function chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPham) {
    var HTMLDanhSachSanPham ='<div class="row row-phukien">';
    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        var htmlSanPham = chuyenDoiTuongSanPhamThanhHTML(sanPham);
        HTMLDanhSachSanPham += htmlSanPham;
    }
    HTMLDanhSachSanPham += '</div>';
    
    return HTMLDanhSachSanPham;
}

// Truyền vào 1 đối tượng sản phẩm ra đầu ra là 1 HTML
function chuyenDoiTuongSanPhamThanhHTML(sanPham) {
    var sanPham = TaoDoiTuongSanPham(sanPham.maSanPham, sanPham.hinhAnhTruoc,sanPham.hinhAnhSau,sanPham.ten,sanPham.giaGoc,sanPham.phanTramGiamGia,sanPham.id);
    
    var html = `
    <div class="col-6 col-md-3 col-phukien">
        <div class="sanpham">
            <div class="sampham__img">
                <a href="MotSanPham.html">
                    <img src="${sanPham.hinhAnhTruoc}" alt="" class="sanpham-img sanpham-img-old">
                    <img src="${sanPham.hinhAnhSau}" alt="" class="sanpham-img sanpham-img-new">
                </a>
                <div class="sanpham__hover text-center">
                    <a href="GioHang.html" class="sanpham__hover-muangay">
                        MUA NGAY 
                        <i class="bi bi-arrow-right"></i>
                    </a href="GioHang.html">
                    <button class="sanpham__hover-themvaogio" onclick="DuaVaoGioHang('${sanPham.id}')">
                        THÊM VÀO GIỎ
                    </button >
                </div>
            </div>
            <div class="sanpham__body">
                <div class="sanpham__body-heading">
                    <a href="#" class="sanphan__body-heading--link">
                        ${sanPham.ten}
                    </a>
                </div>
                <div class="sanpham__body-rate">
                    <span class="sanpham__body-rate-star">
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                        <i class="bi bi-star-fill"></i>
                    </span>
                    <span class="sanpham__body-rate-evaluate">
                        3 đánh giá
                    </span>
                </div>
                <div class="sanpham__body-rice text-center">
                    <span class="sanpham__body-rice-old"><del>${sanPham.giaGoc} VNĐ</del> </span>
                    <span class="sanpham__body-rice-new">${sanPham.tinhGiamGia()} VNĐ</span>
                </div>
            </div>
            <div class="sanpham__sale text-center">
                <p class="sanpham__sale-heading">${sanPham.phanTramGiamGia*100 +'%'}</p>
            </div>
        </div>
    </div>
    `;

    return html;
}

function TruyXuatSanPhamTheoID(id) {
    var sanPhamTruyXuat = new Object();

    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachSanPham = JSON.parse(jsonDanhSachSanPham);

    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        if(sanPham.id == id ){
            sanPhamTruyXuat = sanPham;
        }
    }
    sanPhamTruyXuat = TaoDoiTuongSanPham(sanPhamTruyXuat.maSanPham, sanPhamTruyXuat.hinhAnhTruoc, sanPhamTruyXuat.hinhAnhSau, sanPhamTruyXuat.ten,sanPhamTruyXuat.giaGoc,sanPhamTruyXuat.phanTramGiamGia,sanPhamTruyXuat.id);
    return sanPhamTruyXuat;
}
 
// Lấy danh sách đối tượng để đưa vào trang web
function LayDanhSachSanPhamGiayNamTuLocalStorage() {
    // 1: Lấy danh sách sản phẩm từ localStorage
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachSanPham = TaoDoiTuongSanPham().fromJsons(jsonDanhSachSanPham);
    var danhSachSanPhamNamTamThoi = new Array();
    // 2:Chuyển danh sách đối tượng thành HTML ( Chỉ là giày Nam thôi, các sản phẩm còn lại làm tương tự)
    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if(sanPhamHienTai.maSanPham.search("GNam") !== -1) {
            danhSachSanPhamNamTamThoi.push(sanPhamHienTai);
            var HTML = chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPhamNamTamThoi);
        }
    }

    // 3: Gắn đoạn HTML vào id sanPhamGiamGia
    var nodeSanPhamGiamGia = document.getElementById('sanPhamGiamGia');
    nodeSanPhamGiamGia.innerHTML = HTML;
}

function LayDanhSachSanPhamGiayNuTuLocalStorage() {
    // 1: Lấy danh sách sản phẩm từ localStorage
    var jsonDanhSachSanPham = localStorage.getItem('danhSachSanPham');
    var danhSachSanPham = TaoDoiTuongSanPham().fromJsons(jsonDanhSachSanPham);
    var danhSachSanPhamNuTamThoi = new Array();
    // 2:Chuyển danh sách đối tượng thành HTML ( Chỉ là giày Nam thôi, các sản phẩm còn lại làm tương tự)
    for(var i = 0; i < danhSachSanPham.length; i++) {
        var sanPhamHienTai = danhSachSanPham[i];
        if(sanPhamHienTai.maSanPham.search("GNu") !== -1) {
            danhSachSanPhamNuTamThoi.push(sanPhamHienTai);
            var HTML = chuyenDanhSachDoiTuongSanPhamThanhHTML(danhSachSanPhamNuTamThoi);
        }
    }

    // 3: Gắn đoạn HTML vào id sanPhamGiamGia
    var nodeSanPhamNu = document.getElementById('sanPhamNu');
    nodeSanPhamNu.innerHTML = HTML;
}