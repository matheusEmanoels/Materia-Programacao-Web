package br.edu.utfpr.pb.pw44s.server.error;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.Map;

public class ExcepetionHandlerAdvice {
    @ExceptionHandler
    @ResponseStatus
    public ApiError handlerValidationException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        BindingResult result = exception.getBindingResult();
        Map<String, String> validationErrors = new HashMap<>();

        for(FieldError fieldError : result.getFieldErrors()) {
            validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return new ApiError(HttpStatus.BAD_REQUEST.value(),
                "Validation Error!",
                request.getServletPath(),
                validationErrors);
    }


    @ExceptionHandler({IllegalStateException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerValidationException(IllegalStateException exception, HttpServletRequest request) {
        return new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation Error!", request.getServletPath(), null);
    }

    @ExceptionHandler({HttpMessageNotReadableException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handlerValidationException(HttpMessageNotReadableException exception, HttpServletRequest request) {
        return new ApiError(HttpStatus.BAD_REQUEST.value(), "Validation Error!", request.getServletPath(), null);
    }
}
