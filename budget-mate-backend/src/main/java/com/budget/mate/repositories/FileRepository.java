package com.budget.mate.repositories;

import com.budget.mate.domain.FileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {
    Optional<FileEntity> findByName(String name);

    Optional<FileEntity> findByFileId(String fileId);

    List<FileEntity> findAllByCategory(String category);

    Boolean existsByName(String name);
}
