package br.edu.utfpr.pb.pw44s.server.dto;

import br.edu.utfpr.pb.pw44s.server.model.ProductOrder;
import br.edu.utfpr.pb.pw44s.server.model.User;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {
    private long id;

    private ProductOrder productOrderId;

    @NotNull
    private Double price;

    @NotNull
    private Date date;

    private User userId;

    private List<ProductOrder> productOrders;

}
