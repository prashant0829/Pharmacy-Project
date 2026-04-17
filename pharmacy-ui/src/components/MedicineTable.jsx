function MedicineTable({ data }) {
  const getRowClass = (m) => {
    if (!m.expiryDate) return "";

    const expiry = new Date(m.expiryDate);

    const today = new Date();

    if (isNaN(expiry)) return ""; // safety check

    const diffTime = expiry.getTime() - today.getTime();
    //console.log(expiry.getTime(), today.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    console.log(m.fullName, diffDays);
    if (diffDays < 30) return "row-red";
    if (m.quantity < 10) return "row-yellow";
    //console.log(diffDays, diffTime);
    return "";
  };

  return (
    <div className="table-container">
      <table className="med-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Expiry</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m.id} className={getRowClass(m)}>
              <td>{m.fullName}</td>
              <td>{m.expiryDate}</td>
              <td>{m.quantity}</td>
              <td>₹{m.price}</td>
              <td>{m.brand}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineTable;
