package com.budget.mate.dto;

import lombok.*;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
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
