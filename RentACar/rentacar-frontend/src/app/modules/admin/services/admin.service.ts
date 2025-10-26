import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';


const BASIC_URL = ["http://localhost:9000"];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  postCar(carDto: any) {
    return this.http.post(BASIC_URL + "/api/admin/car", carDto);
  }

  updateCar(carId: number,carDto: any) {
    return this.http.put(BASIC_URL + "/api/admin/car/" + carId, carDto);
  }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/cars");
  }

  deleteCar(carId: number): Observable<any> {
    return this.http.delete(BASIC_URL + "/api/admin/car/" + carId);
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/car/" + carId);
  }

  getBookings(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/admin/car/bookings");
  }

  changeStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(BASIC_URL + `/api/admin/car/booking/${bookingId}/${status}`);
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/admin/car/search", searchCarDto);
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = StorageService.getToken();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + token
    );
  }

}
