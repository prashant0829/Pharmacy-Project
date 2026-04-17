import { useEffect, useState } from "react";
import axios from "axios";
import MedicineTable from "./components/MedicineTable";
import "./App.css";

const API = "http://localhost:5000/api/medicine";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const res = await axios.get(API);
    setMedicines(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = medicines.filter((m) => {
    const term = search.toLowerCase();

    return (
      m.fullName?.toLowerCase().includes(term) ||
      m.brand?.toLowerCase().includes(term) ||
      m.quantity?.toString().includes(term) ||
      m.price?.toString().includes(term)
    );
  });

  return (
    <div className="container">
      <div className="card">
        <h2>Pharmacy Dashboard</h2>

        <input
          className="search-box"
          placeholder="Search by name, brand, price, quantity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <MedicineTable data={filtered} />
      </div>
    </div>
  );
}

export default App;
