package ar.edu.unsam.tpdb.controller
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.bind.annotation.CrossOrigin
import com.fasterxml.jackson.databind.module.SimpleModule
import ar.edu.unsam.tpdb.domain.Test
import org.springframework.web.bind.annotation.GetMapping
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.SerializationFeature
import ar.edu.unsam.tpdb.domain.Repositorio
import ar.edu.unsam.tpdb.database.Conexion

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
