package ar.edu.unsam.tpdb.controller

import ar.edu.unsam.tpdb.formularios.FilterOrden
import ar.edu.unsam.tpdb.formularios.ReproductionQuery
import java.sql.SQLException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
class ReproductionController {
	@PutMapping("/searchReproductionsOf/{userId}")
	def busqueda(@PathVariable Integer userId, @RequestBody FilterOrden body) {
		try {
			val reproductions = new ReproductionQuery().searchReproductionOf(userId, body)
			ResponseEntity.ok(reproductions)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
}
