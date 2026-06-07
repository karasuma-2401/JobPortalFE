import { publicApi } from '../api/api';
//Các hàm bên dưới dùng để kiểm tra tình trạng server cũng như xem cấu trúc trả về
//Chúng ta cần quan tâm 3 dạng cấu trúc khi nhận dữ liệu từ BE: JSON, biến đơn (1 chuỗi, 1 số...), error exception
export class HealthService {
    static async getHealth() {
        return await publicApi.get('/health'); //Server phan hoi mot string (single variable) nhu the nao
    }
    static async readness() {
        return await publicApi.get('/health/readness'); //Khi thanh cong thi server se phan JSOn nhu the nao
    }
    static async error() {
        return await publicApi.get('/health/error'); //Khi bi error thi cu the server se phan hoi nhu the nao?
    }
}
