package com.nimbus.services.customer;

import com.nimbus.dtos.BookACarDto;
import com.nimbus.dtos.CarDto;
import com.nimbus.dtos.CarDtoList;
import com.nimbus.dtos.SearchCarDto;

import java.util.List;

public interface CustomerService {
    List<CarDto> getAllCars();
    CarDto getCarById(Long carId);
    boolean bookACar(Long carId, BookACarDto bookACarDto);
    List<BookACarDto> getBookingsByUserId(Long userId);
    CarDtoList searchCar(SearchCarDto searchCarDto);
}
