package com.budget.mate.api;

import com.budget.mate.dto.FileDto;
import com.budget.mate.services.FileService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/files")
public class FileController {
    @Resource
    private FileService fileService;


    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getChatFile(@PathVariable("fileId") @NotNull @NotEmpty @NotBlank String fileId) {
        ResponseEntity<byte[]> response;
        try {
            FileDto fileDto = fileService.findFileById(fileId);
            response = ResponseEntity.ok()
                    .contentType(MediaType.valueOf(fileDto.getType()))
                    .body(fileDto.getContent());
        } catch (Exception e) {
            response = ResponseEntity.notFound().build();
        }
        return response;
    }

    @GetMapping("/default")
    public ResponseEntity<List<FileDto>> getAllDefaultAvatars() {
        return ResponseEntity.ok(fileService.findAllDefaultAvatars());
    }
}
