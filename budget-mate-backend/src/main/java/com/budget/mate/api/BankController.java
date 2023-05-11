package com.budget.mate.api;

import com.budget.mate.dto.BankDto;
import com.budget.mate.dto.CreateBankDto;
import com.budget.mate.services.BankService;
import com.sun.istack.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/banks")
public class BankController {
   @Resource
   private BankServiceImpl bankService;

   @PostMapping(value = { "/add", "/update" })
   public ResponseEntity<BaseResponse> createOrUpdateBank(@Valid @RequestBody BankDto bankDto) {
      BaseResponse response = bankService.createOrUpdateBank(bankDto);
      return new ResponseEntity<>(response, HttpStatus.CREATED);
   }

   @GetMapping(value = "/{bankId}")
    public ResponseEntity<BankDto> getBankById(@PathVariable(Long id) @NotNull @NotEmpty @NotBlank String bankId) {
        BankDto bank = bankService.findBankById(id);
        return new ResponseEntity<EmployeeDTO>(bank, HttpStatus.OK);
    }

   @GetMapping(value = "/find")
   public ResponseEntity<List<EmployeeDTO>> getAllEmployees() {
      List<EmployeeDTO> list = bankService.findEmployeeList();
      return new ResponseEntity<List<BankDto>>(list, HttpStatus.OK);
   }
}
