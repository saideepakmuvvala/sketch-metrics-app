import React, { useState } from "react";

// Constant data (the data you provided earlier)
const data = [
  {"_id":"VW_KKG00_E_00079_101000000000000000002333079600001","date":"2024-11-01T15:22:35.487Z","status":"Completed","vendor":"Desi Crew","sketch_timing":123,"sketch_count":22},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600002","date":"2024-11-02T09:14:55.487Z","status":"In-Progress","vendor":"Vendor A","sketch_timing":98,"sketch_count":31},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600003","date":"2024-11-05T16:44:01.487Z","status":"Completed","vendor":"Desi Crew","sketch_timing":110,"sketch_count":28},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600004","date":"2024-11-07T18:22:12.487Z","status":"Completed","vendor":"Vendor B","sketch_timing":135,"sketch_count":17},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600005","date":"2024-11-10T12:13:11.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":140,"sketch_count":25},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600006","date":"2024-11-12T07:53:20.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":85,"sketch_count":19},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600007","date":"2024-11-13T19:10:01.487Z","status":"Completed","vendor":"Vendor A","sketch_timing":103,"sketch_count":22},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600008","date":"2024-11-15T14:23:52.487Z","status":"In-Progress","vendor":"Vendor B","sketch_timing":92,"sketch_count":18},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600009","date":"2024-11-16T09:55:31.487Z","status":"Completed","vendor":"Desi Crew","sketch_timing":115,"sketch_count":27},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600010","date":"2024-11-17T20:12:44.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":122,"sketch_count":34},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600011","date":"2024-11-18T11:33:22.487Z","status":"Completed","vendor":"Vendor A","sketch_timing":118,"sketch_count":21},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600012","date":"2024-11-20T10:43:55.487Z","status":"In-Progress","vendor":"Vendor B","sketch_timing":130,"sketch_count":24},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600013","date":"2024-11-21T14:55:39.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":124,"sketch_count":29},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600014","date":"2024-11-23T13:22:59.487Z","status":"Completed","vendor":"Desi Crew","sketch_timing":137,"sketch_count":32},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600015","date":"2024-11-25T08:17:41.487Z","status":"In-Progress","vendor":"Vendor A","sketch_timing":110,"sketch_count":23},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600016","date":"2024-11-26T16:31:02.487Z","status":"Completed","vendor":"Desi Crew","sketch_timing":105,"sketch_count":20},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600017","date":"2024-11-28T09:04:30.487Z","status":"Completed","vendor":"Vendor B","sketch_timing":142,"sketch_count":27},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600018","date":"2024-11-29T18:14:52.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":129,"sketch_count":33},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600019","date":"2024-11-30T11:12:07.487Z","status":"Completed","vendor":"Vendor A","sketch_timing":135,"sketch_count":22},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600020","date":"2024-12-01T17:02:14.487Z","status":"In-Progress","vendor":"Vendor B","sketch_timing":95,"sketch_count":29},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600021","date":"2024-12-02T14:50:47.487Z","status":"Completed","vendor":"Desi Crew","sketch_timing":118,"sketch_count":26},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600022","date":"2024-12-04T12:42:33.487Z","status":"In-Progress","vendor":"Vendor A","sketch_timing":125,"sketch_count":30},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600023","date":"2024-12-05T08:57:39.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":132,"sketch_count":20},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600024","date":"2024-12-06T15:34:05.487Z","status":"Completed","vendor":"Vendor B","sketch_timing":110,"sketch_count":28},{"_id":"VW_KKG00_E_00079_101000000000000000002333079600025","date":"2024-12-07T13:45:25.487Z","status":"In-Progress","vendor":"Desi Crew","sketch_timing":95,"sketch_count":25}
];

const SketchTimings = () => {
  const [filters, setFilters] = useState({
    date: "All",
    status: "All",
    vendor: "All",
    customRange: { startDate: "", endDate: "" },
  });

  const [filteredData, setFilteredData] = useState(data);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter the data based on selected filters
  const applyFilters = () => {
    let filtered = data;

    // Filter by Date
    if (filters.date === "Yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      filtered = filtered.filter((row) => new Date(row.date).toLocaleDateString() === yesterday.toLocaleDateString());
    } else if (filters.date === "This Week") {
      const startOfWeek = new Date();
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date();
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= startOfWeek && rowDate <= endOfWeek;
      });
    } else if (filters.date === "This Month") {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      const endOfMonth = new Date();
      endOfMonth.setMonth(endOfMonth.getMonth() + 1);
      endOfMonth.setDate(0);

      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= startOfMonth && rowDate <= endOfMonth;
      });
    } else if (filters.date === "This Year") {
      const startOfYear = new Date();
      startOfYear.setMonth(0, 1);
      const endOfYear = new Date();
      endOfYear.setMonth(11, 31);

      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= startOfYear && rowDate <= endOfYear;
      });
    } else if (filters.date === "Custom Range" && filters.customRange.startDate && filters.customRange.endDate) {
      const startDate = new Date(filters.customRange.startDate);
      const endDate = new Date(filters.customRange.endDate);

      filtered = filtered.filter((row) => {
        const rowDate = new Date(row.date);
        return rowDate >= startDate && rowDate <= endDate;
      });
    }

    // Filter by Status and Vendor
    if (filters.status !== "All") {
      filtered = filtered.filter((row) => row.status.toLowerCase().includes(filters.status.toLowerCase()));
    }

    if (filters.vendor !== "All") {
      filtered = filtered.filter((row) => row.vendor.toLowerCase().includes(filters.vendor.toLowerCase()));
    }

    setFilteredData(filtered);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "32px", color: "#333" }}>Sketch Timings</h1>

      {/* Filter Controls */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <div>
          <select
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            style={selectStyle}
          >
            <option value="All">All</option>
            <option value="Yesterday">Yesterday</option>
            <option value="This Week">This Week</option>
            <option value="This Month">This Month</option>
            <option value="This Year">This Year</option>
            <option value="Custom Range">Custom Range</option>
          </select>
        </div>

        {filters.date === "Custom Range" && (
          <>
            <input
              type="date"
              name="startDate"
              value={filters.customRange.startDate}
              onChange={(e) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  customRange: { ...prevFilters.customRange, startDate: e.target.value },
                }))
              }
              style={inputStyle}
            />
            <input
              type="date"
              name="endDate"
              value={filters.customRange.endDate}
              onChange={(e) =>
                setFilters((prevFilters) => ({
                  ...prevFilters,
                  customRange: { ...prevFilters.customRange, endDate: e.target.value },
                }))
              }
              style={inputStyle}
            />
          </>
        )}

        <div>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            style={selectStyle}
          >
            <option value="All">All</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <select
            name="vendor"
            value={filters.vendor}
            onChange={handleFilterChange}
            style={selectStyle}
          >
            <option value="All">All</option>
            <option value="Desi Crew">Desi Crew</option>
            <option value="Vendor A">Vendor A</option>
            <option value="Vendor B">Vendor B</option>
          </select>
        </div>

        <div>
          <button
            onClick={applyFilters}
            style={buttonStyle}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Table UI */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Vendor</th>
            <th style={thStyle}>Sketch Timing</th>
            <th style={thStyle}>Sketch Count</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={row._id} style={rowStyle(index)}>
                <td style={tdStyle}>{index + 1}</td>
                <td style={tdStyle}>{new Date(row.date).toLocaleDateString()}</td>
                <td style={tdStyle}>{row.status}</td>
                <td style={tdStyle}>{row.vendor}</td>
                <td style={tdStyle}>{row.sketch_timing}</td>
                <td style={tdStyle}>{row.sketch_count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={noDataStyle}>
                No data available for the selected filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Styles
const selectStyle = {
  padding: "8px",
  width: "200px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const inputStyle = {
  padding: "8px",
  width: "150px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const tableStyle = {
  width: "100%",
  marginTop: "20px",
  borderCollapse: "collapse",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
};

const thStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "12px",
  textAlign: "center",
  fontSize: "16px",
};

const tdStyle = {
  padding: "12px",
  textAlign: "center",
  fontSize: "16px",
};

const rowStyle = (index) => ({
  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
  transition: "background-color 0.3s ease",
});

const noDataStyle = {
  textAlign: "center",
  padding: "20px",
  color: "#888",
  fontSize: "18px",
};

export default SketchTimings;
