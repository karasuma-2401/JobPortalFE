import { privateApi } from "../api/api";
import type { ApplicationStatus } from "../types/application";

export const ApplicationService = {
  getApplications: async () => {
    const response = await privateApi.get("/job-application");
    return response.data;
  },

  updateStatus: async (id: number, status: ApplicationStatus) => {
    const response = await privateApi.patch(`/job-application/${id}`, {
      status: status,
    });
    return response.data;
  },

  deleteApplication: async (id: number) => {
    const response = await privateApi.delete(`/job-application/${id}`);
    return response.data;
  },
};
