package com.budget.mate.services;

import com.budget.mate.domain.FileEntity;
import com.budget.mate.dto.FileDto;
import com.budget.mate.mapper.Mapper;
import com.budget.mate.repositories.FileRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FileServiceImpl implements FileService {
    @Resource
    private FileRepository fileRepository;
    @Resource
    private Mapper bm;
    private static final List<String> defaultAvatars = List.of("anaconda.png", "chicken.png", "deer.png",
            "jaguar.png", "koi.png", "panda-bear.png", "pelican.png", "pork.png", "shark.png", "turtle.png");

    @Override
    public void loadDefaultAvatars() {
        defaultAvatars.forEach(avatarName -> {
            InputStream avatar = this.getClass().getClassLoader().getResourceAsStream("img/" + avatarName);
            if (avatar != null && !fileRepository.existsByName(avatarName)) {
                try {
                    String fileId = UUID.randomUUID().toString();
                    byte[] file = avatar.readAllBytes();
                    FileEntity fileEntity = FileEntity.builder()
                            .fileId(fileId)
                            .category("DEFAULT_AVATAR")
                            .name(avatarName)
                            .type("image/png")
                            .content(file)
                            .url("http://localhost:8080/api/files/" + fileId)
                            .size((long) file.length)
                            .build();
                    fileRepository.save(fileEntity);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }

    @Override
    public FileDto findFileById(String fileId) {
        FileEntity fileEntity = fileRepository.findByFileId(fileId).orElseThrow(() -> new RuntimeException("FIle not found"));
        return bm.getFileDto(fileEntity);
    }

    @Override
    public String findAvatarUrlByName(String name) {
        FileEntity fileEntity = fileRepository.findByName(name).orElseThrow(() -> new RuntimeException("FIle not found"));
        return fileEntity.getUrl();
    }

    @Override
    public String findAvatarUrlById(String id) {
        FileEntity fileEntity = fileRepository.findByFileId(id).orElseThrow(() -> new RuntimeException("FIle not found"));
        return fileEntity.getUrl();
    }

    @Override
    public List<FileDto> findAllDefaultAvatars() {
        return fileRepository.findAllByCategory("DEFAULT_AVATAR").stream()
                .map(fileEntity -> bm.getFileDto(fileEntity))
                .collect(Collectors.toList());
    }
}
