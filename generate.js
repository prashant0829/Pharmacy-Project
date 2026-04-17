const fs = require("fs");

const medicinesData = [
  { name: "Paracetamol", strengths: [500, 650] },
  { name: "Ibuprofen", strengths: [200, 400] },
  { name: "Amoxicillin", strengths: [250, 500] },
  { name: "Aspirin", strengths: [75, 150] },
  { name: "Cetirizine", strengths: [5, 10] },
];

const brands = ["ABC Pharma", "HealWell", "MedLife", "CureFast", "ZenCare"];

const medicines = [];

for (let i = 1; i <= 100; i++) {
  const med = medicinesData[Math.floor(Math.random() * medicinesData.length)];
  const strength =
    med.strengths[Math.floor(Math.random() * med.strengths.length)];
  const brand = brands[Math.floor(Math.random() * brands.length)];

  const expiry = new Date();

  // 🔥 Force some near-expiry items
  const isNearExpiry = Math.random() < 0.3;
  expiry.setDate(
    expiry.getDate() +
      (isNearExpiry
        ? Math.floor(Math.random() * 25)
        : Math.floor(Math.random() * 300)),
  );

  // 🔥 Force some low stock
  const isLowStock = Math.random() < 0.3;

  medicines.push({
    id: i.toString(),
    fullName: `${med.name} ${strength}mg`,
    notes: "General purpose medicine",
    expiryDate: expiry.toISOString().split("T")[0],
    quantity: isLowStock
      ? Math.floor(Math.random() * 9) + 1
      : Math.floor(Math.random() * 50) + 10,
    price: parseFloat((Math.random() * 200).toFixed(2)),
    brand: brand,
  });
}

fs.writeFileSync("data.json", JSON.stringify(medicines, null, 2));

console.log("✅ Balanced dataset created");
