using System.Text.Json;
using PharmacyApi.Models;

namespace PharmacyApi.Services
{
    public class MedicineService
    {
        private readonly string filePath = "data.json";

        // ✅ Get all medicines
        public List<Medicine> GetAll()
        {
            try
            {
                if (!File.Exists(filePath))
                    return new List<Medicine>();

                var json = File.ReadAllText(filePath);

                if (string.IsNullOrWhiteSpace(json))
                    return new List<Medicine>();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true, // 🔥 KEY FIX
                    NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
                };

                var data = JsonSerializer.Deserialize<List<Medicine>>(json, options);

                return data ?? new List<Medicine>();
            }
            catch (Exception ex)
            {
                Console.WriteLine("❌ Deserialization Error: " + ex.Message);
                return new List<Medicine>();
            }
        }

        // ✅ Save all medicines (with formatting)
        public void SaveAll(List<Medicine> medicines)
        {
            var json = JsonSerializer.Serialize(medicines, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            File.WriteAllText(filePath, json);
        }

        // ✅ Add new medicine
        public Medicine Add(Medicine medicine)
        {
            var list = GetAll();

            medicine.Id = Guid.NewGuid().ToString();
            list.Add(medicine);

            SaveAll(list);

            return medicine;
        }

        // ✅ Search by name (for your requirement)
        public List<Medicine> Search(string name)
        {
            var list = GetAll();

            return list
                .Where(m => m.FullName != null &&
                            m.FullName.Contains(name, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }
    }
}