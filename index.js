import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';
import readlineSync from 'readline-sync';

// Inisialisasi StudentManager
const studentManager = new StudentManager();

// Fungsi untuk menampilkan menu
function displayMenu() {
  console.log('\n=== SISTEM MANAJEMEN NILAI SISWA ===');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa (by ID)');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
}

// Fungsi untuk menambah siswa baru
function addNewStudent() {
  console.log('\n=== TAMBAH SISWA BARU ===');
  
  // Input ID siswa
  const id = readlineSync.question('ID Siswa: ');
  
  // Cek apakah ID sudah ada
  if (studentManager.findStudent(id)) {
    console.log('Error: ID siswa sudah digunakan!');
    return;
  }
  
  // Input nama siswa
  const name = readlineSync.question('Nama Siswa: ');
  
  // Validasi nama tidak boleh kosong
  if (!name.trim()) {
    console.log('Error: Nama siswa tidak boleh kosong!');
    return;
  }
  
  // Input kelas siswa
  const studentClass = readlineSync.question('Kelas Siswa: ');
  
  // Validasi kelas tidak boleh kosong
  if (!studentClass.trim()) {
    console.log('Error: Kelas siswa tidak boleh kosong!');
    return;
  }
  
  // Buat objek Student baru
  const student = new Student(id, name, studentClass);
  
  // Tambahkan ke StudentManager
  if (studentManager.addStudent(student)) {
    console.log('Siswa berhasil ditambahkan!');
  } else {
    console.log('Error: Gagal menambahkan siswa!');
  }
}

// Fungsi untuk melihat semua siswa
function viewAllStudents() {
  console.log('\n=== DAFTAR SISWA ===');
  studentManager.displayAllStudents();
}

// Fungsi untuk mencari siswa berdasarkan ID
function findStudentById() {
  console.log('\n=== CARI SISWA ===');
  const id = readlineSync.question('Masukkan ID Siswa: ');
  
  const student = studentManager.findStudent(id);
  
  if (student) {
    student.displayInfo();
  } else {
    console.log('Siswa tidak ditemukan!');
  }
}

// Fungsi untuk update data siswa
function updateStudentData() {
  console.log('\n=== UPDATE DATA SISWA ===');
  const id = readlineSync.question('Masukkan ID Siswa: ');
  
  const student = studentManager.findStudent(id);
  
  if (!student) {
    console.log('Siswa tidak ditemukan!');
    return;
  }
  
  console.log('Data siswa saat ini:');
  student.displayInfo();
  
  // Input nama baru
  const newName = readlineSync.question(`Nama (${student.name}): `);
  
  // Input kelas baru
  const newClass = readlineSync.question(`Kelas (${student.class}): `);
  
  // Siapkan data update
  const updateData = {};
  if (newName.trim()) updateData.name = newName;
  if (newClass.trim()) updateData.class = newClass;
  
  // Update data siswa
  if (studentManager.updateStudent(id, updateData)) {
    console.log('Data siswa berhasil diupdate!');
    
    // Tampilkan data yang sudah diupdate
    console.log('\nData siswa setelah update:');
    studentManager.findStudent(id).displayInfo();
  } else {
    console.log('Error: Gagal mengupdate data siswa!');
  }
}

// Fungsi untuk menghapus siswa
function deleteStudent() {
  console.log('\n=== HAPUS SISWA ===');
  const id = readlineSync.question('Masukkan ID Siswa: ');
  
  const student = studentManager.findStudent(id);
  
  if (!student) {
    console.log('Siswa tidak ditemukan!');
    return;
  }
  
  // Tampilkan data siswa yang akan dihapus
  console.log('Data siswa yang akan dihapus:');
  student.displayInfo();
  
  // Konfirmasi penghapusan
  const confirm = readlineSync.question('Apakah Anda yakin ingin menghapus siswa ini? (y/n): ');
  
  if (confirm.toLowerCase() === 'y') {
    if (studentManager.removeStudent(id)) {
      console.log('Siswa berhasil dihapus!');
    } else {
      console.log('Error: Gagal menghapus siswa!');
    }
  } else {
    console.log('Penghapusan dibatalkan.');
  }
}

// Fungsi untuk menambah nilai siswa
function addStudentGrade() {
  console.log('\n=== TAMBAH NILAI SISWA ===');
  const id = readlineSync.question('Masukkan ID Siswa: ');
  
  const student = studentManager.findStudent(id);
  
  if (!student) {
    console.log('Siswa tidak ditemukan!');
    return;
  }
  
  // Tampilkan data siswa
  console.log('Data siswa:');
  student.displayInfo();
  
  // Input mata pelajaran
  const subject = readlineSync.question('Mata Pelajaran: ');
  
  // Validasi mata pelajaran tidak boleh kosong
  if (!subject.trim()) {
    console.log('Error: Mata pelajaran tidak boleh kosong!');
    return;
  }
  
  // Input nilai
  const scoreInput = readlineSync.question('Nilai (0-100): ');
  const score = parseFloat(scoreInput);
  
  // Validasi nilai harus angka dan antara 0-100
  if (isNaN(score) || score < 0 || score > 100) {
    console.log('Error: Nilai harus berupa angka antara 0-100!');
    return;
  }
  
  try {
    // Tambah nilai ke siswa
    student.addGrade(subject, score);
    console.log('Nilai berhasil ditambahkan!');
    
    // Tampilkan data siswa setelah penambahan nilai
    console.log('\nData siswa setelah penambahan nilai:');
    student.displayInfo();
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
}

// Fungsi untuk melihat top 3 siswa
function viewTopStudents() {
  console.log('\n=== TOP 3 SISWA ===');
  
  const topStudents = studentManager.getTopStudents(3);
  
  if (topStudents.length === 0) {
    console.log('Tidak ada data siswa');
    return;
  }
  
  topStudents.forEach((student, index) => {
    console.log(`\nPeringkat ${index + 1}:`);
    student.displayInfo();
    console.log('------------------------');
  });
}

// Fungsi utama untuk menjalankan aplikasi
function main() {
  let running = true;
  
  while (running) {
    displayMenu();
    
    const choice = readlineSync.question('Pilih menu (1-8): ');
    
    switch (choice) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        findStudentById();
        break;
      case '4':
        updateStudentData();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addStudentGrade();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        running = false;
        console.log('Terima kasih telah menggunakan aplikasi ini!');
        break;
      default:
        console.log('Pilihan tidak valid! Silakan pilih 1-8.');
    }
  }
}

// Jalankan aplikasi
main();
