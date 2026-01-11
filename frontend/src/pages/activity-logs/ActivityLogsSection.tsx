import { useState } from "react";
import Details from "../../components/Details"
import SectionHeading from "../../components/SectionHeading"
import formatDate from "../../utils/formatDate"
import ActivityLogsTable from "./ActivityLogsTable"

export default function ActivityLogsContent() {
    const [lastUpdated, setLastUpdated] = useState<string | undefined>(undefined);

    return (
        <>
            <SectionHeading>
                <Details subtitle={'All Activities'} modifiedDate={lastUpdated && formatDate(lastUpdated)} />
            </SectionHeading>

            <ActivityLogsTable setLastUpdated={setLastUpdated} />
        </>
    )
}