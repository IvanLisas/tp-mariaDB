package ar.edu.unsam.tpdb.controller

import ar.edu.unsam.tpdb.formularios.FilterOrden
import ar.edu.unsam.tpdb.formularios.ReproductionQuery
import ar.edu.unsam.tpdb.formularios.StatsQuery
import java.sql.SQLException
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@CrossOrigin
@RestController
class ReproductionController {
	
	@PutMapping("/searchReproductionsOf/{userId}")
	def searchReproductionsOf(@PathVariable Integer userId, @RequestBody FilterOrden body) {
		try {
			val reproductions = new ReproductionQuery().searchReproductionOf(userId, body)
			ResponseEntity.ok(reproductions)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/reproductionsByDate/{user_id}/{month}/{year}")
	def reproductionsByDate(@PathVariable Integer user_id, @PathVariable Integer month, @PathVariable Integer year) {
		try {
			val average = new StatsQuery().actionsByDate(user_id, month, year, 'reproduction')
			ResponseEntity.ok(average)

		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}

	@GetMapping("/reproductionsLast12Months/{user_id}")
	def reproductionsLast12Month(@PathVariable Integer user_id) {
		try {
			val average = new StatsQuery().actionsLast12Months(user_id, 'reproduction')
			ResponseEntity.ok(average)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
	
	
	@GetMapping("/reproductionAverage/{user_id}")
	def reproductionsAverage(@PathVariable Integer user_id) {
		try {
			val average = new StatsQuery().actionsAverage(user_id,'reproduction')
			ResponseEntity.ok(average)
		} catch (SQLException e) {
			println(e.message)
			ResponseEntity.badRequest.body(e.message)
		}
	}
	
}
