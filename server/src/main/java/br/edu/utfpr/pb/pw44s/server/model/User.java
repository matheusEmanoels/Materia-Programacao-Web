package br.edu.utfpr.pb.pw44s.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="user_tb")
@Getter @Setter
public class User {

    @Id
    @GeneratedValue
    private long id;

    private String username;
    private String displayName;
    private String password;
}
