import type { ReactElement } from "react";
import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import Options from "../../../components/Options";
import formatDate from "../../../utils/formatDate";
import { Link } from "react-router";

type Truck = {
    plateNumber: ReactElement;
    make: string;
    model: string;
    dateAdded: string;
    options: ReactElement
};

const truckColumns: Column<Truck>[] = [
    { key: "plateNumber", label: "Plate Number", render: (value) => value as React.ReactElement },
    { key: "make", label: "Make" },
    { key: "model", label: "Model" },
    { key: "dateAdded", label: "Date Added" },
    { key: "options", label: "", render: (value) => value as React.ReactElement },
];

export default function TrucksTable({ data }: {data: []}) {
    const truckItems = data || []

    const trucks: Truck[] = truckItems.map(
        (item: Record<string, any>) => ({
            plateNumber: <Link to={`/trucks/${item.truckId}`}>{item.plate}</Link>,
            make: item.make,
            model: item.model,
            dateAdded: formatDate(item.createdAt, "date"),
            options:
                <Options
                // onEdit={() => handleEdit(item)}
                // onDelete={() => { setSelectedId(item.id); setShowDeleteModal(true) }}
                />
        })
    );

    return (
        <Table columns={truckColumns} rows={trucks} withOptions={true} />
    )
}