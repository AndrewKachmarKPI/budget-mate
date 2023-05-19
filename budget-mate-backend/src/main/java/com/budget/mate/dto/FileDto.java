package com.budget.mate.dto;

import lombok.*;

@Builder(toBuilder = true)
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FileDto {
    private Long id;
    private String fileId;
    private String category;
    private String name;
    private String type;
    private byte[] content;
    private String url;
    private Long size;
}
