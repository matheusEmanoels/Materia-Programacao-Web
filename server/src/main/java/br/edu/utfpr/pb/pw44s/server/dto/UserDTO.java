package br.edu.utfpr.pb.pw44s.server.dto;


import br.edu.utfpr.pb.pw44s.server.annotation.UniqueUsername;
import br.edu.utfpr.pb.pw44s.server.model.User;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    private long id;

    @NotNull(message = "O atributo usuario nao pode ser nulo.")
    @Size(min = 4, max = 50, message = "O tamanho do username deve ser entre 4 e 50 caracteres")
    @UniqueUsername(message = "Esse nome de usuário já está em uso.")
    private String username;

    @NotNull
    @Size(min = 4, max = 50, message = "O tamanho do displayname deve ter entre 4 e 50 caracteres")
    private String displayName;

    @NotNull(message = "A senha não pode ser vazia")
    @Size(min = 6, max = 12, message = "O tamanho da senha deve ser de no minimo 6 e maximo 12 caracteres")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
    private String password;

    private UserDTO(User user) {
        this.id = user.getId();
        this.displayName = user.getDisplayName();
        this.username = user.getUsername();
    }
}
