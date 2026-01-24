import type { ReactElement } from "react";
import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";
import { Link } from "react-router";

type ArchivedOrder = {
    jobNumber: ReactElement;
    plateNumber: ReactElement;
    totalBill: number;
    contractorCommission: number;
    shopCommission: number;
};

const archivedOrderColumns: Column<ArchivedOrder>[] = [
    { key: "jobNumber", label: "Job Number", render: (value) => value as React.ReactElement },
    { key: "plateNumber", label: "Plate Number", render: (value) => value as React.ReactElement },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "contractorCommission", label: "Commission", render: (value) => formatPesoFromCents(value as number) },
    { key: "shopCommission", label: "Shop Commission", render: (value) => formatPesoFromCents(value as number) },
];


export default function ArchivedOrdersTable({ data }: { data: [] }) {
    const archives = data || []
    const archivedOrders: ArchivedOrder[] = archives.map(
        (item: Record<string, any>) => ({
            jobNumber: <Link to={`/job-orders/${item.id}`}>{item.jobOrderCode}</Link>,
            plateNumber: <Link to={`/trucks/${item.truckId}`}>{item.plate}</Link>,
            totalBill: item.totalBill,
            contractorCommission: item.contractorCommission,
            shopCommission: item.shopCommission,
        })
    );

    return (
        <Table columns={archivedOrderColumns} rows={archivedOrders} />
    )
}