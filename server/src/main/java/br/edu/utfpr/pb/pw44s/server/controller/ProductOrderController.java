package br.edu.utfpr.pb.pw44s.server.controller;

import br.edu.utfpr.pb.pw44s.server.dto.ProductOrderDTO;
import br.edu.utfpr.pb.pw44s.server.model.ProductOrder;
import br.edu.utfpr.pb.pw44s.server.service.ICrudService;
import br.edu.utfpr.pb.pw44s.server.service.IProductOrderService;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("productOrder")
public class ProductOrderController extends CrudController<ProductOrder, ProductOrderDTO, Long> {
    private static IProductOrderService productOrderService;
    private static ModelMapper modelMapper;

    public ProductOrderController(IProductOrderService productOrderService, ModelMapper modelMapper) {
        super(ProductOrder.class, ProductOrderDTO.class);
        ProductOrderController.productOrderService = productOrderService;
        ProductOrderController.modelMapper = modelMapper;
    }

    @Override
    protected ICrudService<ProductOrder, Long> getService() {
        return productOrderService;
    }

    @Override
    protected ModelMapper getModelMapper() {
        return modelMapper;
    }
}
