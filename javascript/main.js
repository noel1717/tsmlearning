document.addEventListener("DOMContentLoaded", function () {
  // --- 0. Referensi Elemen DOM & Inisialisasi (Caching DOM) ---
  const pdfModal = new bootstrap.Modal(document.getElementById("pdfModal"));
  const pdfIframe = document.getElementById("pdf-iframe");
  const textDisplayDiv = document.getElementById("text-content-display");
  const textTitle = document.getElementById("text-content-title");
  const textBody = document.getElementById("text-content-body");
  const modalTitle = document.getElementById("pdfModalLabel");
  const btnDownload = document.getElementById("btn-download");
  const materiNavMenu = document.getElementById("materi-nav-menu");
  const materiContainer = document.getElementById("materi-container");
  const searchInput = document.getElementById("searchInput");
  const filterBtns = document.querySelectorAll(".filter-btn");

  const materiMenuBtns = materiNavMenu
    ? materiNavMenu.querySelectorAll(".materi-menu-btn")
    : [];
  const videoSelectBtns = document.querySelectorAll(".video-select-btn");

  let currentMateriData = null; // --- Konfigurasi Materi (Contoh Data) ---

  const materiConfig = {
    "Sistem Bahan Bakar": {
      file: "file/SistemBahanBakar.pdf",
      sub: {
        komponen: `
                    <h3>Komponen Utama Karburator dan EFI</h3>
                    <h4>Sistem Karburator:</h4>
                    <ul>
                        <li><strong>Tangki Bensin:</strong> Tempat penyimpanan bahan bakar.</li>
                        <li><strong>Kran Bensin (Petcock):</strong> Mengontrol aliran bensin ke karburator.</li>
                        <li><strong>Karburator:</strong> Alat pencampur udara dan bahan bakar berdasarkan prinsip Venturi.</li>
                    </ul>`,
        cara_kerja: `
                    <h3>Cara Kerja Sistem Bahan Bakar (Ringkasan)</h3>
                    <h4>Karburator</h4>
                    <ol>
                        <li>Saat piston bergerak ke bawah (langkah hisap), terjadi kevakuman di venturi karburator.</li>
                        <li>Kevakuman ini menghisap bensin dari ruang pelampung melalui *jet* dan bercampur dengan udara.</li>
                    </ol>`,
        troubleshooting: `
                    <h3>Troubleshooting Umum</h3>
                    <ul>
                        <li><strong>Mesin Brebet/Kelebihan Bensin (Karburator):</strong> Jarum pelampung bocor atau setelan Pilot Screw terlalu basah.</li>
                        <li><strong>Susah Start (EFI):</strong> Cek tekanan Fuel Pump, bersihkan atau kalibrasi ulang Throttle Body (ISC/IACV).</li>
                    </ul>`,
        video_a: "https://www.youtube.com/embed/eKG0nWnrueg?autoplay=1",
        video_b: "https://www.youtube.com/embed/ahAqSv8mOps?autoplay=1",
        video_c: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-3?autoplay=1",
      },
    },
    "Sistem Pengapian Dan kelistrikan": {
      file: "file/sistempengapian.pdf",
      sub: {
        // Data sub menu lainnya...
        video_a: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-4?autoplay=1",
      },
    },
    "Sistem Pengereman dan Suspensi": {
      file: "file/SISTEMPENGEREMANDANSUSPENSI.pdf",
      sub: {
        video_a: "https://www.youtube.com/embed/7ScAZKwY7lM?autoplay=1",
        video_b: "https://www.youtube.com/embed/6P4JabBb8uA?autoplay=1",
        video_c: "https://www.youtube.com/embed/rAlGhhp4yQY?autoplay=1",
      },
    },
    "Sistem Transmisi Dan Kopling": {
      file: "file/sistemtransmisidankopling.pdf",
      sub: {
        // Data sub menu lainnya...
        video_a: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-10?autoplay=1",
      },
    },
    "Overhaul Mesin DAn Perawatan Berkala": {
      file: "file/perawatandanoverhaul.pdf",
      sub: {
        video_a: "https://www.youtube.com/embed/CO2VIFbb7fo?autoplay=1",
        video_b: "https://www.youtube.com/embed/-7R66xrA5x4?autoplay=1",
        video_c: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-13?autoplay=1",
      },
    },
    "Sistem Kemudi Rangka Dan Ban": {
      file: "file/sistemkemudirangadaban.pdf",
      sub: {
        komponen: `
                    <h3>Komponen Kemudi, Rangka, dan Ban</h3>
                    <p>Konten teks mengenai komponen utama sistem kemudi, jenis-jenis rangka (chassis), dan spesifikasi ban (tire) akan ditampilkan di sini.</p>`,
        cara_kerja: `
                    <h3>Prinsip Kerja Sistem Kemudi</h3>
                    <p>Mekanisme kerja sistem kemudi, termasuk *steering gear* dan *steering linkage*, akan dijelaskan di sini. 

[Image of steering system components]
</p>`,
        troubleshooting: `
                    <h3>Troubleshooting Ban dan Rangka</h3>
                    <ul>
                        <li><strong>Getaran pada Kemudi:</strong> Cek *wheel balancing* atau keausan ban tidak merata.</li>
                        <li><strong>Kemudi Berat:</strong> Cek tekanan ban dan sistem *power steering* (jika ada).</li>
                    </ul>`,
        video_a: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-16?autoplay=1",
        video_b: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-17?autoplay=1",
      },
    },
    "Sistem Pelumas Dan Pendingin": {
      file: "file/sistempelumasdanpendingin.pdf",
      sub: {
        komponen: `
                    <h3>Komponen Sistem Pelumas dan Pendingin</h3>
                    <h4>Sistem Pelumas:</h4>
                    <ul>
                        <li><strong>Pompa Oli (Oil Pump):</strong> Bertugas mendistribusikan oli ke seluruh komponen mesin.</li>
                        <li><strong>Filter Oli (Oil Filter):</strong> Menyaring kotoran dari oli.</li>
                    </ul>
                    <h4>Sistem Pendingin:</h4>
                    <ul>
                        <li><strong>Radiator:</strong> Tempat pendinginan air pendingin (coolant).</li>
                        <li><strong>Thermostat:</strong> Mengontrol suhu kerja mesin dengan membuka/menutup aliran coolant.</li>
                    </ul>
                    

[Image of engine lubrication system diagram]
`,
        cara_kerja: `
                    <h3>Prinsip Kerja Sistem Pelumas dan Pendingin</h3>
                    <p>Sistem pelumas bekerja dengan cara memompakan oli bertekanan ke bantalan, poros, dan komponen bergerak lainnya untuk mengurangi gesekan dan panas. Sistem pendingin bekerja dengan menyerap panas mesin melalui *water jacket* dan memindahkannya ke udara melalui radiator.</p>`,
        troubleshooting: `
                    <h3>Troubleshooting Umum</h3>
                    <ul>
                        <li><strong>Overheating (Panas Berlebih):</strong> Cek level coolant, fungsi kipas radiator, dan kerusakan thermostat.</li>
                        <li><strong>Lampu Oli Menyala:</strong> Cek level oli, tekanan pompa oli, atau kebocoran.</li>
                    </ul>`,
        video_a: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-18?autoplay=1",
        video_b: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-19?autoplay=1",
      },
    },
    // 🔴 KONFIGURASI BARU UNTUK STARTER DAN PENGISIAN DITAMBAHKAN DI SINI
    "Sistem Starter Dan Pengisian": {
      file: "file/sistemstarterdanpengisian.pdf", // ASUMSI nama file PDF
      sub: {
        komponen: `
                    <h3>Komponen Sistem Starter dan Pengisian</h3>
                    <h4>Sistem Starter:</h4>
                    <ul>
                        <li><strong>Motor Starter:</strong> Berfungsi memutar mesin pertama kali saat kunci kontak diputar.</li>
                        <li><strong>Relay Starter (Solenoid):</strong> Menghubungkan arus besar ke motor starter.</li>
                    </ul>
                    <h4>Sistem Pengisian:</h4>
                    <ul>
                        <li><strong>Alternator/Generator:</strong> Menghasilkan energi listrik saat mesin beroperasi. 

[Image of car alternator]
</li>
                        <li><strong>Regulator/Rectifier:</strong> Mengatur tegangan dan mengubah arus AC menjadi DC.</li>
                    </ul>`,
        cara_kerja: `
                    <h3>Prinsip Kerja Sistem Kelistrikan Dasar</h3>
                    <p>Sistem starter menggunakan daya baterai untuk menggerakkan motor starter. Setelah mesin hidup, alternator (sistem pengisian) mengambil alih untuk memasok listrik ke sistem kendaraan dan mengisi ulang baterai.</p>`,
        troubleshooting: `
                    <h3>Troubleshooting Umum</h3>
                    <ul>
                        <li><strong>Starter Mati Total:</strong> Periksa baterai (aki), sekering, atau solenoid starter.</li>
                        <li><strong>Lampu Baterai Menyala di Dasbor:</strong> Menandakan alternator atau sistem pengisian bermasalah.</li>
                    </ul>`,
        video_a: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-20?autoplay=1",
        video_b: "https://www.youtube.com/embed/REAL-YOUTUBE-ID-21?autoplay=1",
      },
    },
    "Kumpulan Soal Uji Kompetensi": {
      file: "file/KumpulanSoal.pdf",
      sub: {},
    },
  }; // Akhir Konfigurasi Materi
  function filterAndDisplayCards(filterValue, searchTerm) {
    if (!materiContainer) return;

    const cards = materiContainer.querySelectorAll(".col");
    const cleanSearchTerm = searchTerm.toLowerCase().trim();

    cards.forEach((card) => {
      const title =
        card.querySelector(".card-title")?.textContent.toLowerCase() || "";
      const textContent =
        card.querySelector(".card-text")?.textContent.toLowerCase() || "";
      const categoryClass = card.className;

      const matchesSearch =
        title.includes(cleanSearchTerm) ||
        textContent.includes(cleanSearchTerm);

      const matchesCategory =
        filterValue === "all" ||
        categoryClass.includes(`category-${filterValue}`);

      if (matchesSearch && matchesCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  } // --- FUNGSI UTAMA: loadContent (Pemuatan PDF Lokal) ---
  function loadContent(url, type, title = "") {
    pdfIframe.style.display = "none";
    textDisplayDiv.style.display = "none"; // Bersihkan src dan allow untuk menghentikan pemutaran/pemuatan sebelumnya

    pdfIframe.src = "";
    pdfIframe.allow = "";

    if (type === "file") {
      // Pemuatan PDF Lokal + Parameter Zoom default browser
      const pdfUrlWithZoom = url + "#zoom=page-width"; // Coba parameter zoom

      pdfIframe.style.display = "block";
      pdfIframe.src = pdfUrlWithZoom;
      pdfIframe.allow = "fullscreen"; // Atur tombol download
      btnDownload.style.display = "block";
      btnDownload.href = url;
      btnDownload.textContent = "⬇️ Download Dokumen Materi Utama";
    } else if (type === "video") {
      // Validasi keamanan URL untuk iframe YouTube
      if (
        url &&
        (url.includes("youtube.com/embed") || url.includes("youtu.be"))
      ) {
        pdfIframe.style.display = "block";
        pdfIframe.src = url;
        pdfIframe.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      } else {
        // Fallback jika URL video tidak valid/placeholder
        console.error("URL video tidak valid atau belum diisi.");
        textDisplayDiv.style.display = "block";
        textTitle.textContent = "Video Tidak Ditemukan";
        textBody.innerHTML =
          "<p>Mohon maaf, tautan video untuk materi ini belum tersedia atau tidak valid.</p>";
        pdfIframe.src = ""; // Pastikan iframe kosong
      }
      btnDownload.style.display = "none";
    } else if (type === "text") {
      textDisplayDiv.style.display = "block";
      textTitle.textContent = title;
      textBody.innerHTML = url; // url berisi konten HTML teks
      btnDownload.style.display = "none";
    }
  } // Akhir fungsi loadContent // --- Event Listeners untuk Cards, Menu, Filter, dan Modal (TETAP SAMA) ---
  materiContainer.addEventListener("click", function (e) {
    const btn =
      e.target.closest(".btn-preview") || e.target.closest(".btn-baca");
    if (btn) {
      const judul = btn.getAttribute("data-judul");
      const fileUtama = btn.getAttribute("data-file");

      currentMateriData = materiConfig[judul];

      if (currentMateriData) {
        modalTitle.textContent = judul;

        loadContent(fileUtama, "file");

        materiMenuBtns.forEach((b) => b.classList.remove("active"));
        videoSelectBtns.forEach((b) => b.classList.remove("active"));

        const primaryBtn = materiNavMenu.querySelector(
          '[data-url-type="file"]'
        );
        if (primaryBtn) {
          primaryBtn.classList.add("active");
        }

        pdfModal.show();
      } else {
        alert(
          `Konfigurasi data materi untuk "${judul}" belum ditemukan di main.js!`
        );
      }
    }
  });

  if (materiNavMenu) {
    materiNavMenu.addEventListener("click", function (e) {
      const btn = e.target.closest(".materi-menu-btn");
      if (btn && currentMateriData) {
        // Reset semua status aktif
        materiMenuBtns.forEach((b) => b.classList.remove("active"));
        videoSelectBtns.forEach((b) => b.classList.remove("active"));

        const urlType = btn.getAttribute("data-url-type");
        const menuKey = btn.getAttribute("data-menu-key");

        if (urlType === "file") {
          loadContent(currentMateriData.file, "file");
          btn.classList.add("active");
        } else if (urlType === "text") {
          const contentHTML = currentMateriData.sub[menuKey];
          const menuTitle = btn.textContent.trim();

          if (contentHTML) {
            loadContent(contentHTML, "text", menuTitle);
            btn.classList.add("active");
          } else {
            loadContent(currentMateriData.file, "file");
            alert(
              `Konten ${menuTitle} untuk materi ini belum diisi. Menampilkan dokumen materi utama.`
            );
            materiNavMenu
              .querySelector('[data-url-type="file"]')
              .classList.add("active");
          }
        } else if (menuKey === "video-group") {
          btn.classList.add("active");
        }
      }
    });
  }

  document
    .getElementById("video-dropdown-menu")
    ?.addEventListener("click", function (e) {
      const itemBtn = e.target.closest(".dropdown-item");
      if (
        itemBtn &&
        itemBtn.classList.contains("video-select-btn") &&
        currentMateriData
      ) {
        materiMenuBtns.forEach((b) => b.classList.remove("active"));
        videoSelectBtns.forEach((b) => b.classList.remove("active"));

        const videoKey = itemBtn.getAttribute("data-video-key");
        const targetUrl = currentMateriData.sub[videoKey];

        if (targetUrl && targetUrl.includes("youtube.com/embed")) {
          loadContent(targetUrl, "video");
          itemBtn.classList.add("active");
          document.getElementById("videoDropdownBtn").classList.add("active");
        } else {
          loadContent(currentMateriData.file, "file");
          alert(
            `Video ${itemBtn.textContent.trim()} tidak valid atau belum diisi. Menampilkan dokumen materi utama.`
          );
          materiNavMenu
            .querySelector('[data-url-type="file"]')
            .classList.add("active");
        }
      }
    }); // Filter dan Search

  searchInput.addEventListener("keyup", function () {
    const searchTerm = searchInput.value;
    const activeFilter =
      document
        .querySelector(".filter-btn.active")
        ?.getAttribute("data-filter") || "all";
    filterAndDisplayCards(activeFilter, searchTerm);
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      const searchTerm = searchInput.value;

      filterAndDisplayCards(filterValue, searchTerm);
    });
  }); // --- HOOK: Event saat Modal ditutup (membersihkan iframe) ---

  document
    .getElementById("pdfModal")
    .addEventListener("hidden.bs.modal", function () {
      // **PENTING:** Hentikan pemutaran video/pemuatan dokumen
      pdfIframe.src = "";
      pdfIframe.allow = "";

      materiMenuBtns.forEach((b) => b.classList.remove("active"));
      videoSelectBtns.forEach((b) => b.classList.remove("active"));
      currentMateriData = null;
    }); // Inisialisasi: Aktifkan tombol 'Semua' dan tampilkan semua kartu saat start

  const allBtn = document.querySelector(".filter-btn-all");
  if (allBtn) {
    allBtn.classList.add("active");
    filterAndDisplayCards("all", "");
  }
});
