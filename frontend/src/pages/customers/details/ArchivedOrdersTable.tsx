import { Link } from "react-router";
import Table from "../../../components/table/Table";
import type { Column } from "../../../components/table/Table";
import formatPesoFromCents from "../../../utils/formatPesoFromCents";
import type { ReactElement } from "react";

type ArchivedOrder = {
    jobNumber: ReactElement;
    plateNumber: ReactElement;
    totalBill: number;
    balance: number;
};

const archivedOrderColumns: Column<ArchivedOrder>[] = [
    { key: "jobNumber", label: "Job Number", render: (value) => value as React.ReactElement },
    { key: "plateNumber", label: "Plate Number", render: (value) => value as React.ReactElement },
    { key: "totalBill", label: "Total Bill", render: (value) => formatPesoFromCents(value as number) },
    { key: "balance", label: "Customer Balance", render: (value) => formatPesoFromCents(value as number) },
];

export default function ArchivedOrdersTable({ data }: { data: [] }) {

    const archives = data || []

    const archivedOrders: ArchivedOrder[] = archives.map(
        (item: Record<string, any>) => ({
            jobNumber: <Link to={`/job-orders/${item.id}`}>{item.jobOrderCode}</Link>,
            plateNumber: <Link to={`/trucks/${item.truckId}`}>{item.plate}</Link>,
            totalBill: item.totalBill,
            balance: item.balance,
        })
    );

    // [
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    //     { jobNumber: 'JO-25-233', plateNumber: 'ABD-322', totalBill: 102000, contractorCommission: 3000, shopCommission: 300000 },
    // ];

    return (
        <Table columns={archivedOrderColumns} rows={archivedOrders} withOptions={true} />
    )
}