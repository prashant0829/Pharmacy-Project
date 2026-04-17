import { useState } from "react";
import { addMedicine } from "../api";

function AddMedicine({ onAdd }) {
  const [form, setForm] = useState({
    fullName: "",
    expiryDate: "",
    quantity: "",
    price: "",
    brand: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await addMedicine({
      ...form,
      quantity: parseInt(form.quantity),
      price: parseFloat(form.price),
    });

    onAdd();
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add Medicine</h3>

      <input name="fullName" placeholder="Name" onChange={handleChange} />
      <input name="expiryDate" type="date" onChange={handleChange} />
      <input
        name="quantity"
        type="number"
        placeholder="Qty"
        onChange={handleChange}
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        onChange={handleChange}
      />
      <input name="brand" placeholder="Brand" onChange={handleChange} />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default AddMedicine;
