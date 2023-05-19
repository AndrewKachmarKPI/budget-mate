package com.budget.mate.services;

import com.budget.mate.dto.FileDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface FileService {
    FileDto findFileById(String fileId);

    String findAvatarUrlByName(String name);
    String findAvatarUrlById(String name);
    List<FileDto> findAllDefaultAvatars();

    void loadDefaultAvatars();
}
