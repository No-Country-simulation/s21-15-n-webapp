
interface Column {
  key: string;
  label: string;
}

interface TablasProps {
  columns: Column[];
  data: Record<string, unknown>[];
}

const Tablas: React.FC<TablasProps> = ({ columns, data }) => {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-md border border-[#2A2E5C]">
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse bg-[#12143B] text">
          {/* Encabezado Fijo */}
          <thead className="bg-customBlue text-white uppercase text-sm">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-center border-b border-[#2A2E5C]"
                  style={{ minWidth: "240px" }} 
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Cuerpo con Scroll Vertical */}
        <div className=" max-h-[500px] overflow-y-auto text-center">
          <table className="w-full border-collapse ">
            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b border-[#2A2E5C]${
                      rowIndex % 2 === 0 ? "bg-[#2A2E5C]" : "bg-[#12143B]"
                    }`}
                  >
                    {columns.map((col) => (
                      <td
                        key={`${rowIndex}-${col.key}`}
                        className="px-6 py-3 border-r"
                        style={{ minWidth: "240px" }}
                      >
                        {String(row[col.key])}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4 text-gray-500">
                    No hay datos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tablas;