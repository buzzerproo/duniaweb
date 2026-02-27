function login(){
    var user=document.getElementById('username').value;
    var pass=document.getElementById('password').value;
    if(user==='' && pass===''){
        document.getElementById('loginPage').style.display='none';
        document.getElementById('homePage').style.display='block';
        document.getElementById('showUser').innerText=user;
    }else{
        document.getElementById('errorMsg').innerText='Username atau password salah!';
    }
}
function logout(){
    document.getElementById('homePage').style.display='none';
    document.getElementById('loginPage').style.display='block';
    document.getElementById('contentArea').innerHTML='';
}

// ====== DATA STORAGE ======
let courses = JSON.parse(localStorage.getItem("courses")) || [
    {id:1,nama:"Manajemen Strategik", hari:"Senin", jam:"08.00 - 10.00"},
    {id:2,nama:"Sistem Informasi Manajemen", hari:"Selasa", jam:"10.00 - 12.00"},
    {id:3,nama:"Kewirausahaan", hari:"Rabu", jam:"13.00 - 15.00"},
    {id:4,nama:"Analisis Data", hari:"Kamis", jam:"09.00 - 11.00"}
];

function saveData(){
    localStorage.setItem("courses", JSON.stringify(courses));
}

function showDashboard(){
    let menu = document.querySelector(".menu-section");
    let profile = document.querySelector(".profile");
    let content = document.getElementById("contentArea");

    menu.classList.add("fade-out");
    profile.classList.add("fade-out");

    setTimeout(()=>{
        menu.style.display="none";
        profile.style.display="none";

        content.style.gridColumn="1 / 3";
        renderDashboard();

        setTimeout(()=>{
            content.style.opacity="1";
            content.style.transform="translateY(0)";
        },50);

    },400);
}

// ===== DATA DASHBOARD =====
function renderDashboard(){
    let today = new Date().toLocaleDateString('id-ID',{weekday:'long'});

    let html = `
    <div style="background:rgba(255,255,255,0.08);padding:25px;border-radius:20px;backdrop-filter:blur(10px);">
        <button onclick="kembaliMenu()" class="btn-modern">
                ⬅ Kembali ke Menu
        </button>
        <h2 style="margin-bottom:15px;">Sistem Akademik (SIAKAD)</h2>
        
        <h3>Tambah / Edit Mata Kuliah</h3>
        <input type="hidden" id="editId">
        <input type="text" id="mk" placeholder="Nama Mata Kuliah" style="padding:8px;margin:5px;border-radius:8px;border:none;">
        <input type="text" id="hari" placeholder="Hari" style="padding:8px;margin:5px;border-radius:8px;border:none;">
        <input type="text" id="jam" placeholder="Jam" style="padding:8px;margin:5px;border-radius:8px;border:none;">
        <button onclick="simpanMK()" style="padding:8px 15px;border:none;border-radius:8px;background:#4e73df;color:white;cursor:pointer;">Simpan</button>
        
        <h3 style="margin-top:20px;">Jadwal Perkuliahan</h3>
        <table style="width:100%;margin-top:10px;border-collapse:collapse;color:white;">
            <tr style="background:rgba(255,255,255,0.2);">
                <th style="padding:10px;">Mata Kuliah</th>
                <th>Hari</th>
                <th>Jam</th>
                <th>Aksi</th>
            </tr>`;

    courses.forEach(c => {
        let highlight = c.hari.toLowerCase() === today.toLowerCase() ? "style='background:rgba(78,115,223,0.4);'" : "";
        html += `<tr ${highlight}>
                    <td style="padding:8px;">${c.nama}</td>
                    <td>${c.hari}</td>
                    <td>${c.jam}</td>
                    <td>
                        <button onclick="editMK(${c.id})" style="margin:3px;padding:5px 10px;border:none;border-radius:6px;background:#f6c23e;cursor:pointer;">Edit</button>
                        <button onclick="hapusMK(${c.id})" style="margin:3px;padding:5px 10px;border:none;border-radius:6px;background:#e74a3b;color:white;cursor:pointer;">Hapus</button>
                    </td>
                 </tr>`;
    });

    html += `</table>
        <p style="margin-top:10px;font-size:14px;opacity:0.8;">Hari ini: <b>${today}</b></p>
    </div>`;

    document.getElementById('contentArea').innerHTML = html;
}

function simpanMK(){
    let id = document.getElementById('editId').value;
    let nama = document.getElementById('mk').value;
    let hari = document.getElementById('hari').value;
    let jam = document.getElementById('jam').value;

    if(!nama || !hari || !jam) return;

    if(id){
        let index = courses.findIndex(c => c.id == id);
        courses[index] = {id:parseInt(id), nama, hari, jam};
    } else {
        let newId = courses.length ? Math.max(...courses.map(c=>c.id))+1 : 1;
        courses.push({id:newId, nama, hari, jam});
    }

    saveData();
    renderDashboard();
}

function editMK(id){
    let data = courses.find(c=>c.id===id);
    document.getElementById('mk').value = data.nama;
    document.getElementById('hari').value = data.hari;
    document.getElementById('jam').value = data.jam;
    document.getElementById('editId').value = data.id;
}

function hapusMK(id){
    if(confirm("Yakin ingin menghapus mata kuliah ini?")){
        courses = courses.filter(c=>c.id!==id);
        saveData();
        renderDashboard();
    }
}
// ===== DATA TUGAS =====
let tugasList = JSON.parse(localStorage.getItem("tugasList")) || [];

function saveTugas(){
    localStorage.setItem("tugasList", JSON.stringify(tugasList));
}

function showTugas(){
    let menu = document.querySelector(".menu-section");
    let profile = document.querySelector(".profile");
    let content = document.getElementById("contentArea");

    menu.classList.add("fade-out");
    profile.classList.add("fade-out");

    setTimeout(()=>{
        menu.style.display="none";
        profile.style.display="none";

        content.style.gridColumn="1 / 3";
        renderTugas();

        setTimeout(()=>{
            content.style.opacity="1";
            content.style.transform="translateY(0)";
        },50);

    },400);
}

function renderTugas(){
    let html = `
    <div style="background:rgba(255,255,255,0.08);padding:25px;border-radius:20px;backdrop-filter:blur(10px);">
        <button onclick="kembaliMenu()" class="btn-modern">
            ⬅ Kembali ke Menu
        </button>
        <h2 style="margin-bottom:15px;">DAFTAR TUGAS</h2>

        <input type="text" id="namaTugas" placeholder="Nama Tugas" style="padding:8px;margin:5px;border-radius:8px;border:none;">
        <input type="date" id="deadline" style="padding:8px;margin:5px;border-radius:8px;border:none;">
        <input type="file" id="fileTugas" style="margin:5px;">
        <button onclick="tambahTugas()" style="padding:8px 15px;border:none;border-radius:8px;background:#1cc88a;color:white;cursor:pointer;">Tambah Tugas</button>

        <table style="width:100%;margin-top:15px;border-collapse:collapse;color:white;">
            <tr style="background:rgba(255,255,255,0.2);">
                <th style="padding:8px;">Selesai</th>
                <th>Nama</th>
                <th>Deadline</th>
                <th>File</th>
                <th>Status</th>
                <th>Aksi</th>
            </tr>`;

    tugasList.forEach(t => {
        html += `
        <tr>
            <td style="text-align:center;">
                <input type="checkbox" ${t.selesai ? "checked" : ""} onclick="toggleSelesai(${t.id})">
            </td>
            <td>${t.nama}</td>
            <td>${t.deadline}</td>
            <td>${t.fileName || "-"}</td>
            <td style="color:${t.selesai ? '#1cc88a' : '#f6c23e'};">
                ${t.selesai ? "Selesai" : "Menunggu"}
            </td>
            <td>
                <button onclick="hapusTugas(${t.id})" style="padding:5px 10px;border:none;border-radius:6px;background:#e74a3b;color:white;cursor:pointer;">Hapus</button>
            </td>
        </tr>`;
    });

    html += `</table></div>`;

    document.getElementById('contentArea').innerHTML = html;
}

function tambahTugas(){
    let nama = document.getElementById("namaTugas").value;
    let deadline = document.getElementById("deadline").value;
    let fileInput = document.getElementById("fileTugas");

    if(!nama || !deadline) return;

    let fileName = fileInput.files.length > 0 ? fileInput.files[0].name : "";

    let newId = tugasList.length ? Math.max(...tugasList.map(t=>t.id))+1 : 1;

    tugasList.push({
        id:newId,
        nama,
        deadline,
        fileName,
        selesai:false
    });

    saveTugas();
    renderTugas();
}

function toggleSelesai(id){
    let tugas = tugasList.find(t=>t.id===id);
    tugas.selesai = !tugas.selesai;
    saveTugas();
    renderTugas();
}

function hapusTugas(id){
    if(confirm("Yakin ingin menghapus tugas ini?")){
        tugasList = tugasList.filter(t=>t.id!==id);
        saveTugas();
        renderTugas();
    }
}
function kembaliMenu(){
    let menu = document.querySelector(".menu-section");
    let profile = document.querySelector(".profile");
    let content = document.getElementById("contentArea");

    content.style.opacity="0";
    content.style.transform="translateY(30px)";

    setTimeout(()=>{
        content.innerHTML="";
        content.style.gridColumn="1 / 2";

        menu.style.display="grid";
        profile.style.display="block";

        setTimeout(()=>{
            menu.classList.remove("fade-out");
            profile.classList.remove("fade-out");
        },50);

    },300);
}