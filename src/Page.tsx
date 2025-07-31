import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import type { DataTablePageParams } from 'primereact/datatable';

interface User {
  title: string;
  place_of_origin: string;
  artist_display: any;
  inscriptions: any;
  date_start: number;
  date_end: number;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: 12,
    page: 1,
  });

  // 🟡 Fetch API Data whenever page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.artic.edu/api/v1/artworks?page=${lazyParams.page + 1}&limit=${lazyParams.rows}`
        );
        const json = await response.json();

        setUsers(json.data);
        setTotalRecords(json.pagination.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lazyParams]);

  //  When page changes
  const onPageChange = (event: DataTablePageParams) => {
    setLazyParams({
      ...lazyParams,
      first: event.first ?? 0,
      rows: event.rows ?? 12,
      page: event.page ?? 1,
    });
  };

  return (
    <div className="card">
      <DataTable
        value={users}
        paginator
        rows={12}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelectedUsers(e.value)}
        selectionMode="checkbox"
        dataKey="id"
        totalRecords={totalRecords}
        lazy
        loading={loading}
        onPage={onPageChange}
        first={lazyParams.first}
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Place of Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>
    </div>
  );
};

export default App;
