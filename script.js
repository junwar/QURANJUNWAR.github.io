// Fungsi untuk memuat daftar surah
async function loadSurahList() {
    try {
        const response = await fetch('https://equran.id/apidev/v2/surat');
        const surahList = await response.json();
        const surahListElement = document.getElementById('surah-list');

        surahList.forEach(surah => {
            const li = document.createElement('li');
            li.textContent = `${surah.nomor}. ${surah.nama_latin} (${surah.nama})`;
            li.onclick = () => loadSurahDetail(surah.nomor);
            surahListElement.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading surah list:', error);
    }
}

// Fungsi untuk memuat detail surah
async function loadSurahDetail(surahNumber) {
    try {
        const response = await fetch(`https://equran.id/apidev/v2/surat/${surahNumber}`);
        const surahDetail = await response.json();
        document.getElementById('surah-title').textContent = `${surahDetail.nama_latin} (${surahDetail.nama})`;
        const surahDetailElement = document.getElementById('surah-detail');
        surahDetailElement.innerHTML = '';

        surahDetail.ayat.forEach(ayat => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${ayat.nomor}.</strong> ${ayat.ar} <br> ${ayat.tr}`;
            surahDetailElement.appendChild(p);
        });
    } catch (error) {
        console.error('Error loading surah detail:', error);
    }
}

// Memuat daftar surah saat halaman di-load
loadSurahList();
