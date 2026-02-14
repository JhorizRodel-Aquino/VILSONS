import { useEffect, useState } from "react";
import { getBranches } from "../services/branchService";
import useGetData from "./useGetData";

export default function useBranchOptions(pollInterval = 200) {
  const [branchOptions, setBranchOptions] = useState<{ value: string; label: string }[]>([]);

  // useEffect(() => {
  //   let intervalId: number; // <-- use number for browser

  //   const tryLoadBranches = () => {
  //     const branches = getBranches();
  //     if (branches?.length) {
  //       setBranchOptions(branches);
  //       clearInterval(intervalId); // stop polling once loaded
  //     }
  //   };

  //   tryLoadBranches(); // try once immediately
  //   intervalId = window.setInterval(tryLoadBranches, pollInterval); // browser-friendly

  //   return () => clearInterval(intervalId);
  // }, [pollInterval]);

  const { data, loading, error } = useGetData("/api/me/branch");

  useEffect(() => {
    console.log("Branch data updated:", data);
    setBranchOptions(
      data?.data?.map((branchItem: any) => ({
        value: branchItem.branch.id,
        label: branchItem.branch.branchName,
      })) || []
    );
  }, [data]);

  return { branchOptions };
}
