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
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import java.sql.SQLException
import org.springframework.web.bind.annotation.DeleteMapping

@CrossOrigin
@RestController
class UserController {

	@PostMapping("/newUser")
	def newUser(@RequestBody String body) {
		try {
			val newUser = mapper.readValue(body, User)
			new UserQuery().insertUser(newUser)
			ResponseEntity.ok(body)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@PutMapping("/updateUser/{userId}")
	def updateUser(@PathVariable Integer userId, @RequestBody String body) {
		try {
			println(body)
			val userToUpdate = mapper.readValue(body, User)
			ResponseEntity.ok(new UserQuery().updateUser(userId, userToUpdate))
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@PutMapping("/updatePassword/{userId}")
	def updatePassword(@PathVariable Integer userId, @RequestBody HashMap<String, String> body) {
		try {
			val oldPassword = body.get('oldPassword')
			val newPassword = body.get('newPassword')
			println(oldPassword + newPassword)
			new UserQuery().updatePassword(userId, oldPassword,newPassword)
			ResponseEntity.ok('ok')
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@PutMapping("/deleteUser")
	def deleteUser(@RequestBody String body) {
		try {
			println(body)
			val userToUpdate = mapper.readValue(body, User)
			new UserQuery().deleteUser(userToUpdate)
			ResponseEntity.ok(body)
		} catch (SQLException e) {
			println(e)
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
