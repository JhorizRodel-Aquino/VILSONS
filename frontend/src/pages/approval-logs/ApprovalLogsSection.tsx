import { useState } from "react";
import Details from "../../components/Details"
import SectionHeading from "../../components/SectionHeading"
import ApprovalLogsTable from "./ApprovalLogsTable"
import formatDate from "../../utils/formatDate";

export default function ApprovalLogsContent() {
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Approvals'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <ApprovalLogsTable setLastUpdated={setLastUpdated}/>
        </>
    )
}