// Tunggu semua elemen HTML dimuat dulu sebelum jalanin script
document.addEventListener('DOMContentLoaded', function() {

    // Ambil semua elemen penting dari halaman
    const form = document.getElementById('task-form');
    const taskListUI = document.getElementById('task-list');
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-status');

    // Cek dulu, ada data tugas di localStorage nggak?
    // Kalo nggak ada, kita mulai dengan array kosong.
    let allTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- FUNGSI-FUNGSI UTAMA ---

    function displayTasks() {
        // Ambil value dari filter dan search
        const searchTerm = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        // Kosongin dulu list tugas di HTML biar nggak numpuk
        taskListUI.innerHTML = '';

        // Saring tugasnya dulu sesuai filter dan keyword pencarian
        const filteredTasks = allTasks.filter(task => {
            const taskNameLower = task.name.toLowerCase();
            const courseNameLower = task.course.toLowerCase();
            
            // Cek kondisi status (all, completed, incomplete)
            const statusMatch = (filterValue === 'all') || 
                                (filterValue === 'completed' && task.isDone) || 
                                (filterValue === 'incomplete' && !task.isDone);
            
            // Cek kondisi pencarian
            const searchMatch = taskNameLower.includes(searchTerm) || courseNameLower.includes(searchTerm);

            return statusMatch && searchMatch;
        });
        
        // Kalo nggak ada tugas, tampilin pesan
        if (filteredTasks.length === 0) {
            taskListUI.innerHTML = '<li class="task-item" style="border-left-color: #6c757d;">Belum ada tugas, atau coba kata kunci lain.</li>';
            updateTaskCount(); // Tetap update count
            return;
        }

        // Kalau ada, kita looping dan tampilkan satu per satu
        filteredTasks.forEach(function(task) {
            // Bikin elemen <li> baru untuk setiap tugas
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            if (task.isDone) {
                taskItem.classList.add('completed');
            }
            
            // Set ID di elemennya, biar gampang dicari nanti
            taskItem.dataset.id = task.id;

            // Atur tanggal biar formatnya enak dibaca (DD/MM/YYYY)
            const formattedDeadline = new Date(task.deadline).toLocaleDateString('id-ID', {
                day: '2-digit', month: '2-digit', year: 'numeric'
            });

            // Ini template HTML buat satu item tugas
            taskItem.innerHTML = `
                <div class="task-details">
                    <p class="task-name">${task.name}</p>
                    <p class="course-name">${task.course}</p>
                    <p class="deadline">Deadline: ${formattedDeadline}</p>
                </div>
                <div class="task-actions">
                    <button class="btn btn-success toggle-btn">${task.isDone ? 'Batal' : 'Selesai'}</button>
                    <button class="btn btn-danger delete-btn">Hapus</button>
                </div>
            `;

            // Masukin item tugas ke dalam list <ul>
            taskListUI.appendChild(taskItem);
        });

        updateTaskCount();
    }

    function saveTasksToLocal() {
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }

    function updateTaskCount() {
        const count = allTasks.filter(task => !task.isDone).length;
        document.getElementById('incomplete-count').innerText = count;
    }

    // --- EVENT HANDLERS ---

    // Handler buat form submit
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Biar halaman nggak refresh

        const taskName = document.getElementById('task-name').value;
        const courseName = document.getElementById('course-name').value;
        const deadline = document.getElementById('deadline').value;

        // Validasi simpel, gaboleh ada yang kosong
        if (!taskName.trim() || !courseName.trim() || !deadline) {
            alert('Wajib isi semua kolom ya!');
            return;
        }

        // Bikin object tugas baru
        const newTask = {
            id: Date.now(), // Pake timestamp biar dapet ID unik, cara gampang hehe
            name: taskName,
            course: courseName,
            deadline: deadline,
            isDone: false // Tugas baru pasti belum selesai
        };

        // Tambahin tugas baru ke array utama
        allTasks.push(newTask);

        // Simpan & update tampilan
        saveTasksToLocal();
        displayTasks();

        // Bersihin form setelah submit
        form.reset();
        document.getElementById('task-name').focus();
    });

    // Handler buat tombol-tombol di list tugas (Selesai & Hapus)
    taskListUI.addEventListener('click', function(event) {
        const item = event.target;
        const taskElement = item.closest('.task-item');
        if (!taskElement) return; // Kalo yg diklik bukan bagian dari item tugas, abaikan

        const taskId = Number(taskElement.dataset.id);

        // Kalo tombol "Hapus" yang diklik
        if (item.classList.contains('delete-btn')) {
            const confirmed = confirm('Yakin mau hapus tugas ini? Nggak bisa balik lagi lho.');
            if (confirmed) {
                // Cari tugasnya di array, terus buang
                allTasks = allTasks.filter(task => task.id !== taskId);
                saveTasksToLocal();
                displayTasks();
            }
        }

        // Kalo tombol "Selesai/Batal" yang diklik
        if (item.classList.contains('toggle-btn')) {
            // Cari tugasnya, terus ubah status isDone nya
            const taskToToggle = allTasks.find(task => task.id === taskId);
            if (taskToToggle) {
                taskToToggle.isDone = !taskToToggle.isDone;
                saveTasksToLocal();
                displayTasks();
            }
        }
    });

    // Event listener buat search dan filter, setiap ada perubahan, panggil displayTasks()
    searchInput.addEventListener('input', displayTasks);
    filterSelect.addEventListener('change', displayTasks);


    // --- INISIALISASI ---
    // Tampilkan semua tugas pas halaman pertama kali dibuka
    displayTasks();
});