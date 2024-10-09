import React, { useState, useMemo, useEffect } from 'react';
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
import { useNavigate, useParams } from "react-router-dom";
import { getResourceOfProject } from "../../../services/api/project";
import AddResourceForm from "../../../components/resource/AddResource";
import Modal from "../../../components/shared/Model";
import { getUsersListByIds } from "../../../services/api/user";



const ResourceList = () => {
    const { projectId } = useParams();
    const [rowData, setRowData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchString, setSearchString] = useState("");
    const user1 = useSelector((state) => state.user.user);
    const user = {...user1};
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const project = useSelector((state) => state.project.project);
    const [debounceSearchQuery, setDebounceSearchQuery] = useState(null);



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
                // if (objectiveSearchValue.length > 0) {
                //     setCurrentlyAppliedFilter({
                //         ...currentlyAppliedFilter,
                //         search: value,
                //     });
                // } else {
                //     setCurrentlyAppliedFilter({
                //         ...currentlyAppliedFilter,
                //         search: value,
                //     });
                // }
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
            field: 'title',
            headerName: 'Title',
            sortable: true,
            filter: true,
            cellRenderer: (params) => {
                return <> <a onClick={() => navigate(`/project/` + projectId + "/resource/" + params.data.id)}> {params.data.title} </a> </>;
            }
        },
        {
            field: 'description',
            headerName: 'Description',
            sortable: true,
            filter: true
        },
        {
            field: 'status',
            headerName: 'Status',
            sortable: true,
            filter: true
        },
        {
            field: 'resouces_type',
            headerName: 'Resource Type',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Created By',
            valueGetter: (params) => `${params.data.firstname} ${params.data.lastname}`, // Assuming user has firstname and lastname
            sortable: true,
            filter: true
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString(); // Adjust format as needed
            },
            sortable: true,
            filter: true
        },
        {
            headerName: '',
            cellRenderer: DeleteRenderer, // Assuming you have a DeleteRenderer component
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

    const onGridReady = async (params) => {
        try {
            const { data } = await getResourceOfProject(projectId);
            console.log({ data });

            let userids = data?.map(({ created_by }) => created_by);
            if (userids.length > 0) {
                let { data: usersData } = await getUsersListByIds({
                    ids: userids
                });
                console.log({ usersData });

                let newdata = data.map((com, index) => {
                    let { firstname, lastname } = usersData.find(({ id }) => id === com.created_by);
                    return { ...com, firstname, lastname }
                });

                setRowData(newdata);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <div className="mb-6">
                <h1 className="text-4xl font-bold mb-4">Resource List</h1>
                <div className="flex text-gray-500 gap-2 text-sm mb-4">
                    <span onClick={() => navigate("/")}>Home</span>
                    <span>/</span>
                    <span onClick={() => navigate("/project/" + project.id)}>{project.name}</span>
                    <span>/</span>
                    <span className='text-black'>Resource List</span>
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
                {user && (user.role === PLATFORM_USERS.ARCHITECT) && (
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
                    onGridReady={onGridReady}
                    rowData={paginatedData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    domLayout='autoHeight'
                    headerHeight={48}
                    rowHeight={48}
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

            <Modal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false), onGridReady(); }}
                title="Add Resource"
                size="xl"
            >
                <AddResourceForm onClose={() => { setIsModalOpen(false), onGridReady() }} />
            </Modal>
        </div>
    );
};

export default ResourceList;