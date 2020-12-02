package ar.edu.unsam.tpdb.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.http.ResponseEntity
import ar.edu.unsam.tpdb.formularios.UserQuery
import java.sql.SQLException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ar.edu.unsam.tpdb.formularios.ReproductionQuery
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import java.util.ArrayList
import ar.edu.unsam.tpdb.formularios.Filtro
import ar.edu.unsam.tpdb.domain.Reproduction

@CrossOrigin
@RestController
class ReproductionController {	
	@PutMapping("/searchReproductionsOf/{userId}")
	def busqueda(@PathVariable Integer userId, @RequestBody ArrayList<Filtro> body) {
		try {
			val reproductions = new ReproductionQuery().searchReproductionOf(userId, body)
			ResponseEntity.ok(reproductions)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
}
