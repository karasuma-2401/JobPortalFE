import { useMutation } from '@tanstack/react-query';
import { type ApiError } from '../api/api';
import { HealthService } from '../services/healthService';

export const useHealth = () => {
    return useMutation({
        mutationFn: HealthService.getHealth,
        onSuccess: (data) => {
            console.log('Receiving data:', data);
        },
        onError: (err: ApiError) => {
            console.log('Health error object 123:', err);
        },
    });
};

export const useHealthReadness = () => {
    return useMutation({
        mutationFn: HealthService.readness,
        onSuccess: (data) => {
            console.log('Receving data from readness:', data);
        },
        onError: (err: ApiError) => {
            console.log(err.message);
        },
    });
};

export const useHealthError = () => {
    return useMutation({
        mutationFn: HealthService.error,
        onSuccess: (data) => {
            console.log('Receving error data:', data);
        },
        onError: (err: ApiError) => {
            console.log('Health error endpoint object 123:', err.message);
        },
    });
};
