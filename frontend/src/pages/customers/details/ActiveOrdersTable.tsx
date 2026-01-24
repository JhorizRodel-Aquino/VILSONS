import type { ReactElement } from "react";
import StatusIndicator from "../../../components/StatusIndicator";
import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import type { Status } from "../../../config/statusConfig";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";
import { Link } from "react-router";

type ActiveOrder = {
    jobNumber: ReactElement;
    plateNumber: ReactElement;
    status: string;
    totalBill: number;
    balance: number;
};

const activeOrderColumns: Column<ActiveOrder>[] = [
    { key: "jobNumber", label: "Job Number", render: (value) => value as React.ReactElement },
    { key: "plateNumber", label: "Plate Number", render: (value) => value as React.ReactElement },
    { key: "status", label: "Status", render: (value) => <StatusIndicator status={value as Status} /> },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "balance", label: "Customer Balance", render: (value) => formatPesoFromCents(value as number) },
];

export default function ActiveOrdersTable({ data }: { data: [] }) {

    const actives = data || []

    const activeOrders: ActiveOrder[] = actives.map(
        (item: Record<string, any>) => ({
            jobNumber: <Link to={`/job-orders/${item.id}`}>{item.jobOrderCode}</Link>,
            plateNumber: <Link to={`/trucks/${item.truckId}`}>{item.plate}</Link>,
            status: item.status,
            totalBill: item.totalBill,
            balance: item.balance,
        })
    );

    return (
        <Table columns={activeOrderColumns} rows={activeOrders} withOptions={true} />
    )
}