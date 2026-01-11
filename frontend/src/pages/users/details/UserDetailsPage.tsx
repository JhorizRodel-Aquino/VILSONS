import PageHeading from "../../../components/PageHeading";
import UserDetailsSection from "./UserDetailsSection";
import PageContent from "../../../components/PageContent";

export default function UserDetailsPage() {
    return (
        <>
            <PageHeading title={'User Profile'} />

            <PageContent>
                <UserDetailsSection />
            </PageContent>
        </>
    )
}