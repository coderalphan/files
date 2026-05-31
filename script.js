// ============================================================
//  script.js — Kişisel Portfolyo Sitesi JavaScript Dosyası
//  Hazırlayan: [Adın Soyadın]
//  Açıklama: Tüm etkileşimler (hamburger menü, form doğrulama,
//            yukarı çık butonu, navbar efekti) burada tanımlıdır.
// ============================================================


// ============================================================
//  1. SAYFA YÜKLENDİĞİNDE ÇALIŞTIRILACAK ANA BLOK
//  "DOMContentLoaded" olayı, HTML tamamen yüklenince tetiklenir.
//  Kodlarımızı bu blok içine yazarız; böylece HTML elementleri
//  hazır olmadan önce erişmeye çalışmayız.
// ============================================================
document.addEventListener('DOMContentLoaded', function () {

    // HTML elementlerini değişkenlere atıyoruz (seçiyoruz)
    const navbar      = document.getElementById('navbar');
    const hamburger   = document.getElementById('hamburger');
    const navLinks    = document.getElementById('navLinks');
    const backToTop   = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const successMsg  = document.getElementById('successMsg');

    // Diğer fonksiyonları çağırıyoruz
    initHamburgerMenu();
    initScrollEvents();
    initFormValidation();

    // ============================================================
    //  2. HAMBURGEr MENÜ (MOBİL MENÜ AÇ/KAPAT)
    //  Hamburger butonuna tıklanınca menü açılır/kapanır.
    //  CSS'teki .open ve .active sınıflarıyla kontrol edilir.
    // ============================================================
    function initHamburgerMenu() {

        // Hamburger butonuna tıklama olayı
        hamburger.addEventListener('click', function () {

            // navLinks listesine "open" sınıfı ekle/çıkar
            // → "open" varsa kaldır, yoksa ekle (toggle)
            navLinks.classList.toggle('open');

            // Hamburger ikonunu X'e dönüştürmek için "active" ekle/çıkar
            hamburger.classList.toggle('active');
        });

        // Menüdeki bir linke tıklanınca menüyü kapat
        // (Tek sayfa yapısında link tıklayınca menü açık kalmasın)
        const menuLinks = navLinks.querySelectorAll('a');

        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
            });
        });
    }


    // ============================================================
    //  3. KAYDIRMA (SCROLL) OLAYLARI
    //  Kullanıcı sayfayı kaydırdığında:
    //  a) Navbar'a gölge efekti eklenir
    //  b) Belirli bir noktadan sonra "Yukarı Çık" butonu görünür
    // ============================================================
    function initScrollEvents() {

        // Sayfa kaydırıldığında çalışacak fonksiyon
        window.addEventListener('scroll', function () {

            // Sayfanın ne kadar kaydırıldığını öğren (piksel olarak)
            const scrollY = window.scrollY;

            // --- Navbar Gölge Efekti ---
            // 50px'den fazla kaydırıldıysa navbar'a "scrolled" sınıfı ekle
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // --- Yukarı Çık Butonu ---
            // 300px'den fazla kaydırıldıysa butonu göster
            if (scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        // Yukarı Çık butonuna tıklanınca sayfanın en üstüne çık
        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Yumuşak kaydırma
            });
        });
    }


    // ============================================================
    //  4. İLETİŞİM FORMU DOĞRULAMA (FORM VALIDATION)
    //  Kullanıcı formu göndermeye çalışınca:
    //  - Boş alanlar kontrol edilir
    //  - E-posta formatı doğrulanır
    //  - Hatalar kullanıcıya gösterilir
    // ============================================================
    function initFormValidation() {

        // Form gönderildiğinde çalışacak olay
        contactForm.addEventListener('submit', function (event) {

            // Tarayıcının kendi form gönderimini engelle
            // (Biz kendi kontrolümüzü yapacağız)
            event.preventDefault();

            // Form alanlarını al
            const nameInput    = document.getElementById('name');
            const emailInput   = document.getElementById('email');
            const messageInput = document.getElementById('message');

            // Hata mesajı alanlarını al
            const nameError    = document.getElementById('nameError');
            const emailError   = document.getElementById('emailError');
            const messageError = document.getElementById('messageError');

            // Doğrulama başlamadan önce eski hataları temizle
            clearErrors(nameInput, nameError);
            clearErrors(emailInput, emailError);
            clearErrors(messageInput, messageError);

            // Herhangi bir hata var mı? Başlangıçta yok sayıyoruz.
            let hasError = false;

            // --- Ad Doğrulama ---
            // trim() boşlukları kaldırır; "   " gibi girişler boş sayılır
            if (nameInput.value.trim() === '') {
                showError(nameInput, nameError, 'Lütfen adınızı girin.');
                hasError = true;
            } else if (nameInput.value.trim().length < 2) {
                showError(nameInput, nameError, 'Ad en az 2 karakter olmalıdır.');
                hasError = true;
            }

            // --- E-posta Doğrulama ---
            if (emailInput.value.trim() === '') {
                showError(emailInput, emailError, 'Lütfen e-posta adresinizi girin.');
                hasError = true;
            } else if (!isValidEmail(emailInput.value.trim())) {
                // E-posta formatı geçersizse hata ver
                showError(emailInput, emailError, 'Geçerli bir e-posta adresi girin. (ornek@mail.com)');
                hasError = true;
            }

            // --- Mesaj Doğrulama ---
            if (messageInput.value.trim() === '') {
                showError(messageInput, messageError, 'Lütfen bir mesaj yazın.');
                hasError = true;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, messageError, 'Mesaj en az 10 karakter olmalıdır.');
                hasError = true;
            }

            // --- Tüm Alanlar Geçerliyse ---
            if (!hasError) {
                // Başarı mesajını göster
                successMsg.style.display = 'block';

                // Formu sıfırla
                contactForm.reset();

                // 5 saniye sonra başarı mesajını gizle
                setTimeout(function () {
                    successMsg.style.display = 'none';
                }, 5000);

                // Not: Gerçek bir gönderim için burada
                // fetch() ile bir API'ye istek atılabilir.
            }
        });
    }


    // ============================================================
    //  YARDIMCI FONKSİYONLAR
    //  Form doğrulamasında kullanılan küçük, tekrar kullanılabilir
    //  fonksiyonlar aşağıda tanımlanmıştır.
    // ============================================================

    /**
     * Bir form alanına hata stili uygular ve hata metnini gösterir.
     * @param {HTMLElement} input   - Hata olan input/textarea elementi
     * @param {HTMLElement} errorEl - Hatanın yazılacağı span elementi
     * @param {string}      message - Kullanıcıya gösterilecek hata metni
     */
    function showError(input, errorEl, message) {
        input.classList.add('error');       // Kırmızı kenarlık için CSS sınıfı
        errorEl.textContent = message;      // Hata mesajını yaz
    }

    /**
     * Bir form alanındaki hata stilini ve mesajını temizler.
     * @param {HTMLElement} input   - Temizlenecek input/textarea
     * @param {HTMLElement} errorEl - Temizlenecek hata mesajı alanı
     */
    function clearErrors(input, errorEl) {
        input.classList.remove('error');    // Kırmızı kenarlığı kaldır
        errorEl.textContent = '';           // Hata metnini sil
    }

    /**
     * E-posta adresinin doğru formatta olup olmadığını kontrol eder.
     * Kullanılan yöntem: Düzenli ifade (Regular Expression / RegEx)
     * Örnek geçerli format: kullanici@alan.com
     * @param  {string}  email - Kontrol edilecek e-posta metni
     * @returns {boolean}      - true = geçerli, false = geçersiz
     */
    function isValidEmail(email) {
        // @ işareti, nokta vb. içermeli; genel e-posta kalıbını kontrol eder
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}); // DOMContentLoaded sonu
