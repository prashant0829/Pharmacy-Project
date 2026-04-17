import { useEffect, useState } from "react";
import { getMedicines } from "./api";
import MedicineTable from "./components/MedicineTable";
import AddMedicine from "./components/AddMedicine";
import "./App.css";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    const res = await getMedicines();
    setMedicines(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = medicines.filter((m) =>
    m.fullName?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="container">
      <div className="card">
        <h2>Pharmacy Dashboard</h2>

        <input
          placeholder="Search medicine..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <MedicineTable data={filtered} />
      </div>
    </div>
  );
}

export default App;
