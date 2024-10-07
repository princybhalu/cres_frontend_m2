import React, { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import DeleteIcon from '../../../assets/icons/delete-icon';
import SearchIcon from "../../../assets/icons/searchIcon";
import { DEBOUNCE_TIME } from "../../../utils/constants";
import { useSelector } from "react-redux";
import { PLATFORM_USERS } from "../../../utils/enums";
import PlusIcon from "../../../assets/icons/plus-icon";
import AddUserModal from "../../../components/members/AddUser"

const UserList = () => {
    // Sample data
    const initialData = [
        { id: 1, name: 'Dipak', role: 'Officer', email: 'chiraggondaliya@gmail.com', addedDate: '06/12/2000 00:00:00', addedBy: 'Bhavin' },
        { id: 2, name: 'Ronak', role: 'Worker', email: 'bhavingondaliya@gmail.com', addedDate: '06/12/2000 00:00:00', addedBy: 'Bhavin' },
        { id: 3, name: 'Vijay', role: 'Dealer', email: 'bhavingondaliya@gmail.com', addedDate: '06/12/2000 00:00:00', addedBy: 'Bhavin' },
        { id: 4, name: 'Harshil', role: 'Architecture', email: 'bhavingondaliya@gmail.com', addedDate: '06/12/2000 00:00:00', addedBy: 'Bhavin' },
        // Add more sample data as needed
    ];

    // State
    const [rowData, setRowData] = useState(initialData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchString, setSearchString] = useState("");
    const user = useSelector((state) => state.user.user);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Custom delete renderer component
    const DeleteRenderer = (props) => {
        const onClick = () => {
            const updatedData = rowData.filter(row => row.id !== props.data.id);
            setRowData(updatedData);
        };

        return (
            <button
                onClick={onClick}
                className="p-2 hover:bg-gray-100 rounded-full"
            >
                <DeleteIcon className="h-5 w-5 text-gray-600" />
            </button>
        );
    };

    const handleSearchInput = (e) => {
        const { value } = e.target;
        const objectiveSearchValue = value.trim();
        setSearchString(value);

        if (debounceSearchQuery !== null) {
            clearTimeout(debounceSearchQuery);
        }

        setDebounceSearchQuery(
            setTimeout(() => {
                if (objectiveSearchValue.length > 0) {
                    setCurrentlyAppliedFilter({
                        ...currentlyAppliedFilter,
                        search: value,
                    });
                } else {
                    setCurrentlyAppliedFilter({
                        ...currentlyAppliedFilter,
                        search: value,
                    });
                }
            }, DEBOUNCE_TIME)
        );
    };

    // Column definitions
    const columnDefs = useMemo(() => [
        {
            headerName: '#',
            valueGetter: 'node.rowIndex + 1',
            width: 70,
            sortable: true
        },
        {
            field: 'name',
            headerName: 'Name',
            sortable: true,
            filter: true
        },
        {
            field: 'role',
            headerName: 'Role',
            sortable: true,
            filter: true
        },
        {
            field: 'email',
            headerName: 'E-Mail',
            sortable: true,
            filter: true
        },
        {
            field: 'addedDate',
            headerName: 'Added date',
            sortable: true,
            filter: true
        },
        {
            field: 'addedBy',
            headerName: 'Added by',
            sortable: true,
            filter: true
        },
        {
            headerName: '',
            cellRenderer: DeleteRenderer,
            width: 70
        }
    ], []);

    // Grid options
    const defaultColDef = useMemo(() => ({
        resizable: true,
        flex: 1
    }), []);

    // Pagination logic
    const filteredData = useMemo(() => {
        return rowData.filter(row =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [rowData, searchQuery]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

    // Pagination controls
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const OnClickOnAddUser = () => {

    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">User List</h1>
                <div className="flex text-gray-500 gap-2 text-sm mb-4">
                    <span>Home</span>
                    <span>/</span>
                    <span>Project 07</span>
                    <span>/</span>
                    <span>User List</span>
                </div>
            </div>

            {/* Search and Add button */}
            <div className="flex justify-end mb-6">
                <div className="flex border border-gray-300 mx-2 px-1 ">
                    <SearchIcon style={`my-auto `} />
                    <input
                        value={searchString}
                        type="text"
                        placeholder="Search"
                        className="p-1 my-auto focus:border-none focus:outline-none w-full sm:w-1/2"
                        onChange={handleSearchInput}
                    />
                </div>
                {user && user.role === PLATFORM_USERS.OFFICER && (
                    <>
                        <button
                            className="text-[#ffffff] bg-[#446ca5] px-4 py-1 rounded mr-4 flex"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="mr-2">
                                <PlusIcon />
                            </span>
                            Add
                        </button>
                    </>
                )}
            </div>

            {/* AG Grid */}
            <div className="ag-theme-alpine w-full h-[400px] rounded-lg overflow-hidden">
                <AgGridReact
                    rowData={paginatedData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                    domLayout='autoHeight'
                    headerHeight={48}
                    rowHeight={48}
                    suppressPaginationPanel={true}
                />
            </div>

            {/* Custom Pagination */}
            <div className="flex items-center gap-2 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Previous
                </button>

                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-600 text-white' : ''
                            }`}
                    >
                        {number}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                >
                    Next
                </button>

                <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="ml-4 border rounded px-2 py-1"
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="text-gray-600">/Page</span>
            </div>

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default UserList;