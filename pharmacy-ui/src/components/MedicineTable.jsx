function MedicineTable({ data }) {
  const getStatus = (m) => {
    if (!m.expiryDate) return "";

    const expiry = new Date(m.expiryDate);
    const today = new Date();

    if (isNaN(expiry)) return "";

    const diffDays = Math.floor(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays < 30) return "expiry";
    if (m.quantity < 10) return "low";
    return "ok";
  };

  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d)) return "";
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1,
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  return (
    <div className="table-card">
      <table className="modern-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Expiry</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Brand</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.map((m) => {
            const status = getStatus(m);

            return (
              <tr key={m.id}>
                <td className="name">{m.fullName}</td>
                <td>{formatDate(m.expiryDate)}</td>
                <td>{m.quantity}</td>
                <td>₹{m.price}</td>
                <td>{m.brand}</td>

                <td>
                  {status === "expiry" && (
                    <span className="badge red">Expiring Soon</span>
                  )}
                  {status === "low" && (
                    <span className="badge yellow">Low Stock</span>
                  )}
                  {status === "ok" && (
                    <span className="badge green">Healthy</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MedicineTable;
