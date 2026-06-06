import { privateApi } from "../api/api";
import type { SavedCandidatesApiResult } from "../types/savedCandidates";

export const SavedCandidateServices = {
  getSavedCandidates: async () => {
    const response = await privateApi.get("/saved-candidates");
    return response.data as SavedCandidatesApiResult;
  },

  removeSavedCandidates: async (jobSeekerId: number) => {
    const response = await privateApi.delete(
      `/saved-candidates/${jobSeekerId}`
    );
    return response.data;
  },
};
