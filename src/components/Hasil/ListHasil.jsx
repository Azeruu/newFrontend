import "./ListHasil.css";
import { useState, useEffect } from "react";
import axios from "../../lib/axios";

const ListHasil = () => {
  const [hasil, setHasil] = useState([]);
  const [jmlData, setJmlData] = useState(0);

  useEffect(() => {
    getRekapNilai();
  }, []);
  useEffect(() => {
    jumlahData();
  }, []);
  // Batas
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(hasil.length / itemsPerPage);

  const handleClick = (value) => {
    if (value === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (value === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (typeof value === "number" && value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = hasil.slice(startIndex, endIndex);
  currentData.sort((a, b) => b.skor_akhir - a.skor_akhir);

  const getRekapNilai = async() =>{
    try {
      const response = await axios.get('/hasil');
      setHasil(response.data)
    } catch (error) {
      console.error('Gagal mengambil data dari API:', error);
    }
  }
  
  // const hapusRekapNilai = async (id) => {
  //   try {
  //     await axios.delete(`/hasil/${id}`);
  //     getRekapNilai();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const jumlahData = async () => {
    try {
      const response = await axios.get("/hasil");
      setJmlData(response.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-hasil-container">
      <div className="list-hasil-grid">
          <h1 className="list-hasil-judul">Hasil Perhitungan MOORA </h1>
          <p className="list-rekap-subjudul">Hasil dari perhitungan yang dilakukan dengan menggunakan perhitungan SPK dengan Metode MOORA</p>
        <div className="list-hasil-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Siswa</th>
                <th>Skor Akhir</th>
                <th>Status</th>
                <th>Peringkat</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((jal, index) => (
                <tr key={jal.id}>
                    <td>{startIndex +index + 1}</td>
                    <td>{jal.nama_lengkap}</td>
                    <td>{jal.skor_akhir}</td>
                    <td>Lolos</td>
                    <td>ke -{index + 1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <button onClick={() => handleClick("prev")} class="page-button">Prev</button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={currentPage === index + 1 ? "page-button-active" : "page-button-nonactive"}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => handleClick("next")} class="page-button">Next</button>
        </div>
        <p className="jumlah-data">Jumlah Data : {jmlData}</p>
        <p className="jumlah-data">Jumlah Page : {totalPages}</p>
      </div>
    </div>
  );
}

export default ListHasil;
