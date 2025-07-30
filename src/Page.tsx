import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useState, useEffect } from 'react';

interface User {
//   code: string;
//   name: string;
//   category: string;
   title:string;
   place_of_origin: string;
   artist_display : any;
   inscriptions : any;
   date_start : Number;
   date_end: number;

}



const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);


//   const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  useEffect(() => {
  fetch(' https://api.artic.edu/api/v1/artworks?page=1')
    .then((res) => res.json())
    .then((data) => setUsers(data.data))
    .catch((error) => console.error('Error fetching data:', error));
}, []);

//   const products: Product[] = [
//     { code: 'f230fh0g3', name: 'Bamboo Watch', category: 'Accessories' },
//     { code: 'nvklal433', name: 'Black Watch', category: 'Accessories' },
//     { code: 'zz21cz3c1', name: 'Blue Band', category: 'Fitness' },
//     { code: '244wgerg2', name: 'Blue T-Shirt', category: 'Clothing' },
//     { code: 'h456wer53', name: 'Bracelet', category: 'Accessories' },
//   ];

  return (
    <div className="card">
      <DataTable
        value={users}
        paginator
        rows={12}
        selection={selectedUsers}
        onSelectionChange={(e) => setSelectedUsers(e.value)}
        selectionMode="checkbox"
        dataKey="code"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        <Column field="title" header="title" />
        <Column field="place_of_origin" header="place_of_origin" />
        <Column field="artist_display" header="artist_display" />
        <Column field="inscriptions" header="inscriptions" />
        <Column field="date_start" header="date_start" />
        <Column field="date_end" header="date_end" />
      </DataTable>
    </div>
  );
};

export default App;
