package ar.edu.unsam.tpdb.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.http.ResponseEntity
import ar.edu.unsam.tpdb.formularios.UserQuery
import java.sql.SQLException
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ar.edu.unsam.tpdb.formularios.ReproductionQuery

@CrossOrigin
@RestController
class ReproductionController {
	@GetMapping("/allReproductions/{userId}")
	def todasReproduccionesDe(@PathVariable Integer userId) {
		try {
			val downloads = new ReproductionQuery().allReproductionsOf(userId, '')
			ResponseEntity.ok(downloads)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
}
