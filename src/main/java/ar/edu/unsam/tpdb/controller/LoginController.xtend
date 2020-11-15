package ar.edu.unsam.tpdb.controller

import ar.edu.unsam.tpdb.database.Conexion
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class LoginController {
	@GetMapping("/test")
	def verificarUserPass() {
		println(new Conexion().consulta())
		
		val apellido = new Conexion().consulta()
		
		ResponseEntity.ok(mapper.writeValueAsString(apellido))
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}
