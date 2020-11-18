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
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import java.util.HashMap
import ar.edu.unsam.tpdb.domain.BusinessException

@RestController
@CrossOrigin
class LoginController {

	@PutMapping("/login")
	def verificarUserPass(@RequestBody HashMap<String, String> body) {
		try {
			val username = body.get('username')
			val password = body.get('password')

			ResponseEntity.ok(new UserQuery().loginUser(username, password))

		} catch (BusinessException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/test")
	def verificarUserPass() {
		val user = new User() => [
			name = "Pepe"
			surname = "Apellido"
			password = "asasas"
			username = "Pepe2"
			dni = 123444
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
