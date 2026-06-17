import axios from 'axios';
import type { InterviewSession } from '../types/interview';

const API_URL = '/api/v1/interviews';
export const fetchInterviews = async (): Promise<InterviewSession[]> => {
    const { data } = await axios.get(`${API_URL}/candidate`);
    return data.data; 
};