import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  User,
} from "@nextui-org/react";
import { PlusIcon } from "./PlusIcon";
import { VerticalDotsIcon } from "./VerticalDotsIcon";
import { SearchIcon } from "./SearchIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { columns, statusOptions } from "./data";
import { capitalize } from "./utils";
import {useNavigate} from "react-router-dom"
import {useDisclosure} from "@nextui-org/react";
import axios from "axios";



const INITIAL_VISIBLE_COLUMNS = [
  "roll",
  "name",
  "level",
  "lastdate",
  "taketest"
];



export default function StudentList({ studentClass }) {
  // console.log(studentClass);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [filterValue, setFilterValue] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([
    {
      roll: 1,
      name: "Tarun1",
      level: 1,
      lastdate: "12.12.34",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      roll: 2,
      name: "Tarun2",
      level: 1,
      lastdate: "12.12.34",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      roll: 3,
      name: "Tarun3",
      level: 1,
      lastdate: "12.12.34",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      roll: 4,
      name: "Tarun4",
      level: 1,
      lastdate: "12.12.34",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      roll: 5,
      name: "Tarun5",
      level: 1,
      lastdate: "12.12.34",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
    {
      roll: 6,
      name: "Tarun6",
      level: 1,
      lastdate: "12.12.34",
      avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("http://localhost:4000/student/getstudent",{
          studentClass
        });
        const test1 = data.allStudent;
        // console.log(test1)
        const arr = test1.map((i) => ({
          roll: i.roll,
          name: i.name,
          level: i.test[0]?.lvl || 0,
          lastdate: i.test[0]?.data ||"Not present",
          studentId : i._id
        }));
        setUsers(arr);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(users)

  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "roll",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);
  // console.log(headerColumns)

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
   
    const handleClick = () => {
      // console.log(columnKey)
      // console.log(user)
      navigate(`/test/${user.studentId}`)
    }

    switch (columnKey) {
      case "name":
        return (
          // <User
          //   avatarProps={{ radius: "lg", src: user.avatar }}
          //   name={cellValue}
          // />
          <div>
            {user.name}
          </div>
        );
        case "taketest":
          return <button className="bg-blue-400 hover:bg-blue-500 p-4 py-2 text-white rounded-lg" onClick={handleClick}>Take Test</button>
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between gap-3 items-end">
              <Input
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Search by name..."
                startContent={<SearchIcon />}
                value={filterValue}
                onClear={() => onClear()}
                onValueChange={onSearchChange}
              />
              <div className="flex gap-3">
                <Dropdown>
                  <DropdownTrigger className="hidden sm:flex">
                    <Button
                      endContent={<ChevronDownIcon className="text-small" />}
                      variant="flat"
                    >
                      Columns
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Table Columns"
                    closeOnSelect={false}
                    selectedKeys={visibleColumns}
                    selectionMode="multiple"
                    onSelectionChange={setVisibleColumns}
                  >
                    {columns.map((column) => (
                      <DropdownItem key={column.uid} className="capitalize">
                        {capitalize(column.name)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
                <Button color="primary" endContent={<PlusIcon />} onClick={ () => navigate("/addStudent")}>
                  Add New
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-default-400 text-small text-white">
                Total {users.length} users
              </span>
              <label className="flex items-center text-default-400 text-small text-white">
                Rows per page:
                <select
                  className="bg-transparent outline-none text-default-400 text-small text-white"
                  onChange={onRowsPerPageChange}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </label>
            </div>
          </div>
        )}
      </>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="py-2 px-2 flex justify-between items-center">
            <span className="w-[30%] text-small text-default-400 text-white">
              {selectedKeys === "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
              >
                Previous
              </Button>
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </>
    );
  }, [selectedKeys, items.length, page, pages]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[382px]",
          }}
          // selectedKeys={selectedKeys}
          // selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          // onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No users found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.roll}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
