package com.nimbus.services.admin;

import com.nimbus.dtos.BookACarDto;
import com.nimbus.dtos.CarDto;
import com.nimbus.dtos.CarDtoList;
import com.nimbus.dtos.SearchCarDto;

import java.io.IOException;
import java.util.List;

public interface AdminService {

    boolean postCar(CarDto carDto);
    List<CarDto> getAllCars();
    void deleteCar(Long carId);
    CarDto getCarById(Long carId);
    boolean updateCar(Long carId, CarDto carDto) throws IOException;
    List<BookACarDto> getBookings();
    boolean changeBookingStatus(Long bookingId, String status);
    CarDtoList searchCar(SearchCarDto searchCarDto);
}
