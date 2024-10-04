package br.edu.utfpr.pb.pw44s.server.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name = "user_tb")
public class User {
    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String displayName;
    private String password;
}
