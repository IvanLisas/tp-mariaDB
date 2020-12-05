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
import java.sql.SQLException

@RestController
@CrossOrigin
class LoginController {

	@PutMapping("/login")
	def verificarUserPass(@RequestBody HashMap<String, String> body) {
		println(body)
		try {
			val username = body.get('username')
			val password = body.get('password')
			val userToLogin = new UserQuery().loginUser(username, password)
			ResponseEntity.ok(userToLogin)

		} catch (SQLException e) {
			ResponseEntity.badRequest.body(e.message)
		}
	}

	static def mapper() {
		new ObjectMapper => [
			configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
			configure(SerializationFeature.INDENT_OUTPUT, true)
		]
	}
}
