package com.clinica_administracion.sistema_administracion_clinica.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
  @GetMapping("/{path:[^\\.]*}")
  public String redirect() {
    return "forward:/index.html";
  }
}

