package ar.edu.unsam.tpdb.controller

import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.User
import ar.edu.unsam.tpdb.formularios.UserQuery

@RestController
@CrossOrigin
class LoginController {
	@GetMapping("/test")
	def verificarUserPass() {
		val user = new User() =>[
			name = "Pepe"
			surname = "Apellido"
			password= "asasas"
			username = "Pepe2"
			dni= 123444
			email = "jajjaj@jaja.cc"	
		]
		new UserQuery().insertUser(user)
		ResponseEntity.ok(mapper.writeValueAsString("ok"))
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}
