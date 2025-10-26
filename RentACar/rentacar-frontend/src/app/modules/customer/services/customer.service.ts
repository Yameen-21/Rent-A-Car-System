import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';


const BASIC_URL = ["http://localhost:9000"];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/cars");
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/" + carId);
  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(BASIC_URL + "/api/customer/car/bookings/" + StorageService.getUserId());
  }

  bookACar(carId: number, bookCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/book/" + carId, bookCarDto);
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(BASIC_URL + "/api/customer/car/search", searchCarDto);
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
